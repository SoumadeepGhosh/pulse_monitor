import { Monitor, MonitorStatus } from "../../generated/prisma/client";

export type MonitorJobData = {
  monitorId: number;
};

export type SendMonitorStatusChangedEmailInput = {
  monitor: Monitor;

  status: MonitorStatus;

  threshold: number;
  recipients: string[];
  dlqRetries?: number;
};
