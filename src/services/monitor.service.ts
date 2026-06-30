import { prisma } from "@/lib/prisma";
import {
  CheckResult,
  Monitor,
  EmailRecipient,
  SuccessCriteria,
} from "../../generated/prisma/client";

import {
  CreateMonitorInput,
  UpdateMonitorInput,
} from "@/validations/monitor.validation";

import {
  AppResponseWrapper,
  createErrorResponse,
  createSuccessResponse,
} from "@/types/common.type";
import {
  removeJobFromMonitorQueue,
  scheduleJobToMonitorQueue,
} from "./queue.service";
import { assignCriteriaToMonitor } from "./monitor-success-criteria.service";
import { assignRecipientsToMonitor } from "./monitor-email-recipient.service";
import {
  CRITERIA_TYPES,
  OPERATORS,
} from "@/validations/success-criteria.validation";

export interface MonitorDetails {
  monitor: Monitor & {
    successCriteriaIds: number[];
    recipientIds: number[];

    criteria: SuccessCriteria[];
    recipients: EmailRecipient[];
  };

  checkResults: CheckResult[];
}

type MonitorWithCriteriaIds = Monitor & {
  successCriteriaIds: number[];
  recipientIds: number[];
};

export async function getMonitorDetails(
  monitorId: number,
  userId: number,
): Promise<AppResponseWrapper<MonitorDetails>> {
  try {
    const monitor = await prisma.monitor.findFirst({
      where: {
        id: monitorId,
        userId,
      },

      include: {
        checkResults: {
          orderBy: {
            checkedAt: "desc",
          },
        },

        criteria: {
          include: {
            successCriteria: true,
          },
        },

        emailRecipients: {
          include: {
            recipient: true,
          },
        },
      },
    });

    if (!monitor) {
      return createErrorResponse("Monitor not found");
    }

    const { checkResults, criteria, emailRecipients, ...monitorData } = monitor;

    return createSuccessResponse("Monitor fetched successfully", {
      monitor: {
        ...monitorData,

        successCriteriaIds: criteria.map((item) => item.successCriteria.id),

        recipientIds: emailRecipients.map((item) => item.recipient.id),

        criteria: criteria.map((item) => ({
          ...item.successCriteria,
          type: item.successCriteria.type as CRITERIA_TYPES,
          operator: item.successCriteria.operator as OPERATORS,
        })),

        recipients: emailRecipients.map((item) => item.recipient),
      },

      checkResults,
    });
  } catch (error) {
    console.error("Error fetching monitor details:", error);
    return createErrorResponse("Failed to fetch monitor");
  }
}

export async function createMonitor(
  userId: number,
  data: CreateMonitorInput,
): Promise<AppResponseWrapper<Monitor>> {
  try {
    const monitor = await prisma.$transaction(async (tx) => {
      const monitor = await tx.monitor.create({
        data: {
          userId,
          name: data.name,
          url: data.url,
          method: data.method,
          intervalMinutes: data.intervalMinutes,
        },
      });

      await assignCriteriaToMonitor(
        tx,
        userId,
        monitor.id,
        data.successCriteriaIds,
      );

      await assignRecipientsToMonitor(
        tx,
        userId,
        monitor.id,
        data.recipientIds,
      );

      return monitor;
    });

    await scheduleJobToMonitorQueue(
      {
        monitorId: monitor.id,
      },
      monitor.intervalMinutes,
    );

    return createSuccessResponse("Monitor created successfully", monitor);
  }  catch (error) {
  console.error("CREATE MONITOR ERROR:", error);

  return createErrorResponse("Failed to create monitor");
}
}

export async function getUserMonitors(
  userId: number,
): Promise<AppResponseWrapper<MonitorWithCriteriaIds[]>> {
  try {
    const monitors = await prisma.monitor.findMany({
      where: {
        userId,
      },
      include: {
        criteria: {
          select: {
            successCriteriaId: true,
          },
        },

        emailRecipients: {
          select: {
            recipientId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

const result = monitors.map(
  ({ criteria, emailRecipients, ...monitor }) => ({
    ...monitor,

    successCriteriaIds: criteria.map(
      (item) => item.successCriteriaId,
    ),

    recipientIds: emailRecipients.map(
      (item) => item.recipientId,
    ),
  }),
);
    return createSuccessResponse("Monitors fetched successfully", result);
  } catch {
    return createErrorResponse("Failed to fetch monitors");
  }
}

export async function deleteMonitor(
  monitorId: number,
  userId: number,
): Promise<AppResponseWrapper<null>> {
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

    await prisma.monitor.delete({
      where: {
        id: monitorId,
      },
    });

    await removeJobFromMonitorQueue({
      monitorId,
    });

    return createSuccessResponse("Monitor deleted successfully", null);
  } catch {
    return createErrorResponse("Failed to delete monitor");
  }
}

export async function updateMonitor(
  userId: number,
  data: UpdateMonitorInput,
): Promise<AppResponseWrapper<Monitor>> {
  try {
    const monitor = await prisma.monitor.findFirst({
      where: {
        id: data.id,
        userId,
      },
    });

    if (!monitor) {
      return createErrorResponse("Monitor not found");
    }

    const updatedMonitor = await prisma.$transaction(async (tx) => {
      const updatedMonitor = await prisma.monitor.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          url: data.url,
          method: data.method,
          intervalMinutes: data.intervalMinutes,
        },
      });

      await assignCriteriaToMonitor(
        tx,
        userId,
        updatedMonitor.id,
        data.successCriteriaIds,
      );
      await assignRecipientsToMonitor(
        tx,
        userId,
        updatedMonitor.id,
        data.recipientIds,
      );

      return updatedMonitor;
    });

    await removeJobFromMonitorQueue({
      monitorId: data.id,
    });

    await scheduleJobToMonitorQueue(
      {
        monitorId: data.id,
      },
      data.intervalMinutes,
    );

    return createSuccessResponse(
      "Monitor updated successfully",
      updatedMonitor,
    );
  } catch {
    return createErrorResponse("Failed to update monitor");
  }
}

export async function changeMonitorStatus(
  monitorId: number,
  userId: number,
): Promise<AppResponseWrapper<Monitor>> {
  try {
    const monitor = await prisma.monitor.findFirst({
      where: {
        id: monitorId,
        userId,
      },
    });

    if (!monitor) {
      return createErrorResponse<Monitor>("Monitor not found");
    }

    const updatedMonitor = await prisma.monitor.update({
      where: {
        id: monitorId,
      },
      data: {
        isActive: !monitor.isActive,
      },
    });

    if (updatedMonitor.isActive) {
      await scheduleJobToMonitorQueue(
        {
          monitorId: updatedMonitor.id,
        },
        updatedMonitor.intervalMinutes,
      );
    } else {
      await removeJobFromMonitorQueue({
        monitorId: updatedMonitor.id,
      });
    }

    return createSuccessResponse(
      `Monitor ${
        updatedMonitor.isActive ? "enabled" : "disabled"
      } successfully`,
      updatedMonitor,
    );
  } catch {
    return createErrorResponse<Monitor>("Failed to update monitor status");
  }
}
