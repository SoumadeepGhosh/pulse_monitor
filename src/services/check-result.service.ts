import { prisma } from "@/lib/prisma";
import {
  Monitor,
  MonitorStatus,
  NotificationType,
} from "../../generated/prisma/client";
import {
  determineMonitorStatus,
  EvaluationInput,
} from "@/lib/monitor-status-config";
import { CheckResultType } from "@/types/monitor.type";
import {
  AppResponseWrapper,
  createErrorResponse,
  createSuccessResponse,
} from "@/types/common.type";
import { SOCKET_EVENTS } from "@/realtime/events";
import { publishEvent } from "@/realtime/publisher";
import { getMonitorCriteria } from "./monitor-success-criteria.service";
import { deleteCache } from "./cache.service";
import { CacheKeys } from "@/lib/cache-keys";
import { addMonitorStatusEmailJob } from "./queue.service";
export interface CheckResultsPagination {
  checkResults: CheckResultType[];
  nextCursor: number | null;
}

export async function applyCheckResult(monitorId: number): Promise<void> {
  const monitor = await prisma.monitor.findUnique({
    where: {
      id: monitorId,
    },
  });

  if (!monitor) {
    return;
  }

  const startedAt = Date.now();

  try {
    const response = await fetch(monitor.url, {
      method: monitor.method,
      signal: AbortSignal.timeout(10000),
    });

    const responseTime = Date.now() - startedAt;

    const responseBody = await response
      .clone()
      .json()
      .catch(() => null);

    const evaluationInput = {
      responseStatusCode: response.status,

      responseTime,

      responseBody,
    };

    const status = await changeMonitorStatus(monitor, evaluationInput);
console.log("Status returned from changeMonitorStatus:", status);
const checkResult = await prisma.checkResult.create({
  data: {
    monitorId,
    success: response.ok,
    status,
    statusCode: response.status,
    responseTime,
  },
});

console.log("Saved CheckResult:", checkResult);
await processMonitorEmailNotifications(monitorId);
    await deleteCache(CacheKeys.monitorDetails(monitorId));
    await publishEvent(SOCKET_EVENTS.MONITOR_UPDATED, {
      monitorId: monitor.id.toString(),
    });
  } catch (error) {
    const responseTime = Date.now() - startedAt;
    const status = await changeMonitorStatus(monitor);
    await prisma.checkResult.create({
      data: {
        monitorId,
        success: false,
        status,
        responseTime,
        errorMessage: error instanceof Error ? error.message : "Unknown Error",
      },
    });
    await processMonitorEmailNotifications(monitorId);
  } finally {
    await prisma.monitor.update({
      where: {
        id: monitorId,
      },
      data: {
        lastCheckedAt: new Date(),
      },
    });
  }
}

async function changeMonitorStatus(
  monitor: Monitor,
  evaluationInput?: EvaluationInput,
): Promise<MonitorStatus> {
  let nextStatus: MonitorStatus;

  if (!evaluationInput) {
    nextStatus = MonitorStatus.DOWN;
  } else {
    const criteria = await getMonitorCriteria(monitor.id);

    nextStatus = determineMonitorStatus(evaluationInput, criteria);
  }

  if (nextStatus !== monitor.status) {
    await prisma.monitor.update({
      where: {
        id: monitor.id,
      },
      data: {
        status: nextStatus,
      },
    });

    const notification = await prisma.notification.create({
      data: {
        userId: monitor.userId,
        type:
          nextStatus === "DOWN"
            ? NotificationType.ERROR
            : NotificationType.SUCCESS,
        message: `Monitor "${monitor.name}" is now ${nextStatus}`,
        redirectPath: `/monitors/${monitor.id}`,
      },
    });

    await publishEvent(SOCKET_EVENTS.NOTIFICATION_CREATED, {
      userId: monitor.userId.toString(),
      notificationId: notification.id.toString(),
      type: notification.type,
      message: notification.message,
      redirectPath: notification.redirectPath,
    });
  }
  console.log("Next Status:", nextStatus);
  return nextStatus;
}
async function processMonitorEmailNotifications(
  monitorId: number,
): Promise<void> {
  const assignments = await prisma.monitorEmailRecipient.findMany({
    where: {
      monitorId,
    },
    include: {
      recipient: true,
      monitor: true,
    },
  });

  if (assignments.length === 0) {
    return;
  }

  // Get the maximum threshold among all recipients.
  const maxThreshold = Math.max(
    ...assignments.map(
      (assignment) => assignment.recipient.consecutiveThreshold,
    ),
  );

  // Fetch monitor history only once.
  const history = await prisma.checkResult.findMany({
    where: {
      monitorId,
    },
    orderBy: {
      checkedAt: "desc",
    },
    take: maxThreshold,
  });

  if (history.length === 0) {
    return;
  }

  for (const assignment of assignments) {
    try {
      const threshold =
        assignment.recipient.consecutiveThreshold;

      if (threshold <= 0) {
        continue;
      }

      const recentResults = history.slice(0, threshold);

      // Not enough history yet.
      if (recentResults.length < threshold) {
        continue;
      }

      const latestStatus = recentResults[0].status;

      // Ignore UNKNOWN checks.
      if (latestStatus === MonitorStatus.UNKNOWN) {
        continue;
      }

      // All recent checks must have the same status.
      const hasConsecutiveStatus = recentResults.every(
        (result) => result.status === latestStatus,
      );

      if (!hasConsecutiveStatus) {
        continue;
      }

      // Don't notify again if we've already notified for this state.
      if (assignment.previousStatus === latestStatus) {
        continue;
      }
console.log({
  recipient: assignment.recipient.email,
  threshold,
  latestStatus,
  previousStatus: assignment.previousStatus,
  history: recentResults.map((r) => r.status),
});
      await addMonitorStatusEmailJob({
        monitor: assignment.monitor,
        recipients: [assignment.recipient.email],
        status: latestStatus,
        threshold,
      });

      await prisma.monitorEmailRecipient.update({
        where: {
          monitorId_recipientId: {
            monitorId,
            recipientId: assignment.recipientId,
          },
        },
        data: {
          previousStatus: latestStatus,
        },
      });
    } catch (error) {
      console.error(
        `Failed processing email notification for recipient ${assignment.recipient.email}`,
        error,
      );
    }
  }
}
export async function getCheckResults(
  monitorId: number,
  userId: number,
  cursor?: number,
): Promise<AppResponseWrapper<CheckResultsPagination>> {
  try {
    const monitor = await prisma.monitor.findFirst({
      where: {
        id: monitorId,
        userId,
      },
    });

    if (!monitor) {
      return createErrorResponse("Monitor not found");
    }

    const checkResults = await prisma.checkResult.findMany({
      where: {
        monitorId,
      },

      take: 20,

      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),

      orderBy: {
        checkedAt: "desc",
      },
    });

    const lastItem = checkResults[checkResults.length - 1];

    return createSuccessResponse("Check results fetched successfully", {
      checkResults,
      nextCursor: lastItem?.id ?? null,
    });
  } catch {
    return createErrorResponse("Failed to fetch check results");
  }
}
