import { Monitor } from "../../generated/prisma/client";

export type MonitorJobData = {
  monitorId: number;
};

export type SendMonitorStatusChangedEmailInput = {
  monitor: Monitor;
  recipients: string[];
  dlqRetries?: number;
}