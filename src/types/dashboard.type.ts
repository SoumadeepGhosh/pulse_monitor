import { MonitorStatus } from "./monitor.type";

export type DashboardFilter = "ALL" | "ACTIVE" | "INACTIVE";

export interface MonitorSummary {
  total: number;
  healthy: number;
  down: number;
  paused: number;
  unknown: number;
}

export interface DashboardHeaderMetrics {
  /**
   * Total monitors based on selected filter.
   */
  totalMonitors: number;

  /**
   * Total monitor checks.
   */
  totalChecks: number;

  /**
   * Average response time.
   */
  averageLatency: number | null;

  /**
   * Overall uptime.
   */
  uptimePercentage: number | null;
}

export interface DashboardOverview {
  header: DashboardHeaderMetrics;

  monitorSummary: MonitorSummary;

  healthScore: number;

  activeIncidents: number;

  alertsToday: number;

  unreadNotifications: number;
   recentChecks: RecentMonitorCheck[];
     successCriteria: SuccessCriteriaDashboard;

  emailNotifications: EmailNotificationDashboard;
}
export interface RecentMonitorCheck {
  id: number;

  monitorId: number;

  monitorName: string;

  status: MonitorStatus;

  statusCode: number | null;

  responseTime: number | null;

  checkedAt: Date;

  isActive: boolean;
}

export interface SuccessCriteriaDashboard {
  totalRules: number;

  assignedRules: number;

  unassignedRules: number;
mostUsedCriteriaName: string;

  coverage: number;

  distribution: {
    responseTime: number;
    statusCode: number;
    responseBody: number;
  };
  

  protectedMonitors: number;

  unprotectedMonitors: number;
}

export interface EmailNotificationDashboard {
  totalRecipients: number;

  assignedRecipients: number;

  unassignedRecipients: number;

  mostUsedRecipientName: string;

  protectedMonitors: number;

  monitorsWithoutRecipients: number;
}

export interface DashboardData {
  overview: DashboardOverview;
}
