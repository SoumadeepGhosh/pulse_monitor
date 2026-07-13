import { Worker } from "bullmq";

import { redis } from "@/lib/redis";

import { MonitorJobData } from "@/types/job.type";
import { applyCheckResult } from "@/services/check-result.service";
import { MONITOR_QUEUE } from "@/queues/monitor.queue";

export const monitorWorker =
  new Worker<MonitorJobData>(
    MONITOR_QUEUE,

    async (job) => {
      await applyCheckResult(
        job.data.monitorId,
      );
    },

    {
      connection: redis as any,

      concurrency: 10,
    },
  );

monitorWorker.on(
  "completed",
  (job) => {
    console.log(
      `Job ${job.id} completed`,
    );
  },
);

monitorWorker.on(
  "failed",
  (job, err) => {
    console.error(
      `Job ${job?.id} failed in monitor worker`,
    );
  },
);

monitorWorker.on("ready", () => {
  console.log("Monitor worker ready");
});

monitorWorker.on("error", (err) => {
  console.error(err);
});

