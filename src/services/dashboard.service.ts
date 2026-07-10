import { prisma } from "@/lib/prisma";
import { AppResponseWrapper, createSuccessResponse } from "@/types/common.type";
import {
  DashboardFilter,
  DashboardHeaderMetrics,
  DashboardOverview,
  EmailNotificationDashboard,
  RecentMonitorCheck,
  SuccessCriteriaDashboard,
} from "@/types/dashboard.type";
import { Prisma } from "../../generated/prisma/client";

export async function getDashboardData(
  userId: number,
  filter: DashboardFilter = "ALL",
): Promise<AppResponseWrapper<DashboardOverview>> {
  const monitorWhere = buildMonitorWhere(userId, filter);

  const [
    header,
    monitorSummary,
    alertsToday,
    unreadNotifications,
    recentChecks,
    successCriteria,
    emailNotifications,
  ] = await Promise.all([
    getHeaderMetrics(monitorWhere),
    getMonitorSummary(monitorWhere),
    getAlertsToday(userId),
    getUnreadNotificationCount(userId),
    getRecentMonitorChecks(userId),
    getSuccessCriteriaOverview(userId),
    getEmailNotificationOverview(userId),
  ]);

  const healthScore = calculateHealthScore(
    monitorSummary,
    header.uptimePercentage,
  );

  return createSuccessResponse("Dashboard loaded successfully", {
    header,

    monitorSummary,

    healthScore,

    activeIncidents: monitorSummary.down,

    alertsToday,

    unreadNotifications,
    recentChecks,
    successCriteria,

    emailNotifications,
  });
}
function buildMonitorWhere(userId: number, filter: DashboardFilter) {
  switch (filter) {
    case "ACTIVE":
      return {
        userId,
        isActive: true,
      };

    case "INACTIVE":
      return {
        userId,
        isActive: false,
      };

    default:
      return {
        userId,
      };
  }
}

async function getHeaderMetrics(
  monitorWhere: Prisma.MonitorWhereInput,
): Promise<DashboardHeaderMetrics> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [totalMonitors, totalChecks, successfulChecks, averageResponse] =
    await Promise.all([
      prisma.monitor.count({
        where: monitorWhere,
      }),

      prisma.checkResult.count({
        where: {
          monitor: monitorWhere,
          checkedAt: {
            gte: since,
          },
        },
      }),

      prisma.checkResult.count({
        where: {
          monitor: monitorWhere,
          checkedAt: {
            gte: since,
          },
          success: true,
        },
      }),

      prisma.checkResult.aggregate({
        where: {
          monitor: monitorWhere,
          checkedAt: {
            gte: since,
          },
          responseTime: {
            not: null,
          },
        },
        _avg: {
          responseTime: true,
        },
      }),
    ]);

  return {
    totalMonitors,

    totalChecks,

    averageLatency: averageResponse._avg.responseTime,

    uptimePercentage:
      totalChecks === 0 ? null : (successfulChecks / totalChecks) * 100,
  };
}
async function getMonitorSummary(monitorWhere: Prisma.MonitorWhereInput) {
  const monitors = await prisma.monitor.findMany({
    where: monitorWhere,
    select: {
      status: true,
      isActive: true,
    },
  });

  const summary = {
    total: monitors.length,
    healthy: 0,
    down: 0,
    paused: 0,
    unknown: 0,
  };

  for (const monitor of monitors) {
    if (!monitor.isActive) {
      summary.paused++;
      continue;
    }

    switch (monitor.status) {
      case "UP":
        summary.healthy++;
        break;

      case "DOWN":
        summary.down++;
        break;

      default:
        summary.unknown++;
    }
  }

  return summary;
}
async function getAlertsToday(userId: number): Promise<number> {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return prisma.notification.count({
    where: {
      userId,
      type: {
        in: ["ALERT", "ERROR"],
      },
      createdAt: {
        gte: today,
      },
    },
  });
}
async function getUnreadNotificationCount(userId: number): Promise<number> {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
}

function calculateHealthScore(
  summary: {
    healthy: number;
    down: number;
  },
  uptime: number | null,
) {
  const total = summary.healthy + summary.down;

  if (total === 0) {
    return uptime ?? 100;
  }

  const statusScore = (summary.healthy / total) * 100;

  if (uptime === null) {
    return Math.round(statusScore);
  }

  return Math.round(statusScore * 0.6 + uptime * 0.4);
}

async function getRecentMonitorChecks(
  userId: number,
  limit = 9,
): Promise<RecentMonitorCheck[]> {
  const checks = await prisma.checkResult.findMany({
    where: {
      monitor: {
        userId,
      },
    },

    include: {
      monitor: {
        select: {
          id: true,
          name: true,
          status: true,
          isActive: true,
        },
      },
    },

    orderBy: {
      checkedAt: "desc",
    },

    take: limit,
  });

  return checks.map((check) => ({
    id: check.id,
    monitorId: check.monitor.id,
    monitorName: check.monitor.name,
    status: check.status,
    statusCode: check.statusCode,
    responseTime: check.responseTime,
    checkedAt: check.checkedAt,
    isActive: check.monitor.isActive,
  }));
}

async function getSuccessCriteriaOverview(
  userId: number,
): Promise<SuccessCriteriaDashboard> {
  const [
    totalRules,
    assignedRules,
    totalMonitors,
    protectedMonitors,
    criteria,
    criteriaUsage,
  ] = await Promise.all([
    prisma.successCriteria.count({
      where: {
        userId,
      },
    }),

    prisma.monitorSuccessCriteria.count({
      where: {
        successCriteria: {
          userId,
        },
      },
    }),

    prisma.monitor.count({
      where: {
        userId,
      },
    }),

    prisma.monitorSuccessCriteria.groupBy({
      by: ["monitorId"],
      where: {
        monitor: {
          userId,
        },
      },
    }),
prisma.successCriteria.findMany({
  where: {
    userId,
  },
  select: {
    id: true,
    name: true,
    type: true,
  },
}),

prisma.monitorSuccessCriteria.groupBy({
  by: ["successCriteriaId"],
  where: {
    successCriteria: {
      userId,
    },
  },
  _count: {
    successCriteriaId: true,
  },
}),
  ]);

  const responseTime = criteria.filter(
    (c) => c.type === "RESPONSE_TIME",
  ).length;

  const statusCode = criteria.filter((c) => c.type === "STATUS_CODE").length;

  const responseBody = criteria.filter(
    (c) => c.type === "RESPONSE_BODY",
  ).length;


  const distributionTotal = responseTime + statusCode + responseBody;

  const protectedCount = protectedMonitors.length;

  let mostUsedCriteriaName = "None";

if (criteriaUsage.length > 0) {
  const mostUsedId = criteriaUsage.sort(
    (a, b) =>
      b._count.successCriteriaId -
      a._count.successCriteriaId,
  )[0].successCriteriaId;

  mostUsedCriteriaName =
    criteria.find(
      (c) => c.id === mostUsedId,
    )?.name ?? "None";
}
  return {
    totalRules,

    assignedRules,

    unassignedRules: totalRules - assignedRules,

    mostUsedCriteriaName,

    coverage:
      totalMonitors === 0
        ? 0
        : Math.round((protectedCount / totalMonitors) * 100),

    distribution: {
      responseTime:
        distributionTotal === 0
          ? 0
          : Math.round((responseTime / distributionTotal) * 100),

      statusCode:
        distributionTotal === 0
          ? 0
          : Math.round((statusCode / distributionTotal) * 100),

      responseBody:
        distributionTotal === 0
          ? 0
          : Math.round((responseBody / distributionTotal) * 100),
    },

    protectedMonitors: protectedCount,

    unprotectedMonitors: totalMonitors - protectedCount,
  };
}

async function getEmailNotificationOverview(
  userId: number,
): Promise<EmailNotificationDashboard> {
  const [recipients, assigned, monitors, protectedMonitors,   recipientList,
  recipientUsage] =
    await Promise.all([
      prisma.emailRecipient.count({
        where: {
          userId,
        },
      }),

      prisma.monitorEmailRecipient.count({
        where: {
          recipient: {
            userId,
          },
        },
      }),

      prisma.monitor.count({
        where: {
          userId,
        },
      }),

      prisma.monitorEmailRecipient.groupBy({
        by: ["monitorId"],
        where: {
          monitor: {
            userId,
          },
        },
      }),

prisma.emailRecipient.findMany({
  where: {
    userId,
  },
  select: {
    id: true,
    name: true,
    consecutiveThreshold: true,
  },
}),

prisma.monitorEmailRecipient.groupBy({
  by: ["recipientId"],
  where: {
    recipient: {
      userId,
    },
  },
  _count: {
    recipientId: true,
  },
}),
    ]);

  const protectedCount = protectedMonitors.length;

let mostUsedRecipientName = "None";

if (recipientUsage.length > 0) {
  const mostUsedId = recipientUsage.sort(
    (a, b) =>
      b._count.recipientId -
      a._count.recipientId,
  )[0].recipientId;

  mostUsedRecipientName =
    recipientList.find(
      (recipient) => recipient.id === mostUsedId,
    )?.name ?? "None";
}

  return {
    totalRecipients: recipients,

    assignedRecipients: assigned,

    unassignedRecipients: recipients - assigned,

    mostUsedRecipientName,

    protectedMonitors: protectedCount,

    monitorsWithoutRecipients: monitors - protectedCount,
  };
}
