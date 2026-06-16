import { monitorQueue } from "@/queues/monitor.queue";
import { MonitorJobData } from "@/types/job.type";

export async function scheduleJobToMonitorQueue(
  data: MonitorJobData,
  intervalMinutes: number,
) {
  await monitorQueue.upsertJobScheduler(
    `monitor-${data.monitorId}`,

    {
      every: intervalMinutes * 60 * 1000,
    },

    {
      name: "check-monitor",

      data: data
    },
  );
}

export async function removeJobFromMonitorQueue(data: MonitorJobData,) {
  await monitorQueue.removeJobScheduler(`monitor-${data.monitorId}`);
}
