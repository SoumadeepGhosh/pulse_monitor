import { Worker } from "bullmq";

import { redis } from "@/lib/redis";

import { SendMonitorStatusChangedEmailInput } from "@/types/job.type";
import { sendMonitorStatusChangedEmail } from "@/services/email.service";
import { EMAIL_QUEUE } from "@/queues/email.queue";
import { emailDlq } from "@/queues/email-dlq.queue";

export const emailWorker =
  new Worker<SendMonitorStatusChangedEmailInput>(
    EMAIL_QUEUE,

    async (job) => {
      await sendMonitorStatusChangedEmail(
        job.data,
      );
    },

    {
      connection: redis as any,

      concurrency: 10,
    },
  );

emailWorker.on(
  "completed",
  async (job) => {
    const pending = await emailDlq.getJob(
      `monitor-${job.data.monitor.id}`
    );

    if (pending) {
        await pending.remove();
    }
    console.log(
      `Job ${job.id} completed`,
    );
  },
);

emailWorker.on(
  "failed",
  async (job, err) => {
    console.error(
      `Job ${job?.id} failed in email worker`,
    );

    if (!job) return;

    const maxAttempts =
      job.opts.attempts ?? 1;

    if (
      job.attemptsMade >= maxAttempts
    ) {

      const existing = await emailDlq.getJob(
        `monitor-${job.data.monitor.id}`
      );

      if (existing) {
        await existing.remove();
      }

      await emailDlq.add(
        job.name,
        {
          ...job.data,
          dlqRetries: job.data.dlqRetries ?? 0,
        },
        {
          jobId: `monitor-${job.data.monitor.id}`,
        },
      );

      await job.remove();

      console.log(
        "Moved to DLQ"
      );
    }
  },
);

emailWorker.on("ready", () => {
  console.log("Email worker ready");
});

emailWorker.on("error", (err) => {
  console.error(err);
});

