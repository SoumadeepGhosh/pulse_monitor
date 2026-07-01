import { Worker } from "bullmq";

import { redis } from "@/lib/redis";

import {
  EMAIL_DLQ,
  emailDlq,
} from "@/queues/email-dlq.queue";

import {
  SendMonitorStatusChangedEmailInput,
} from "@/types/job.type";

import {
  sendMonitorStatusChangedEmail,
} from "@/services/email.service";

const MAX_DLQ_RETRIES = 5;

export const emailDlqWorker =
  new Worker<SendMonitorStatusChangedEmailInput>(
    EMAIL_DLQ,

    async (job) => {
      await sendMonitorStatusChangedEmail(
        job.data,
      );
    },

    {
      connection: redis as any,

      concurrency: 5,
    },
  );

emailDlqWorker.on(
  "completed",
  (job) => {
    console.log(
      `DLQ Job ${job.id} completed`,
    );
  },
);

emailDlqWorker.on(
  "failed",
  async (job, err) => {

    console.error(
      `Job ${job?.id} failed in email DLQ worker`,
    );

    if (!job) return;

    const maxAttempts =
      job.opts.attempts ?? 1;

    /**
     * BullMQ is still retrying.
     */
    if (
      job.attemptsMade <
      maxAttempts
    ) {
      return;
    }

    const dlqRetries =
      job.data.dlqRetries ?? 0;

    if (
      dlqRetries >=
      MAX_DLQ_RETRIES
    ) {

      console.error(
        `Giving up permanently for job ${job.id}`,
      );

      return;
    }

    /**
     * Wait 2 minutes before retrying again.
     */
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

        dlqRetries:
          dlqRetries + 1,
      },

      {
        delay:
          2 * 60 * 1000, // add to email dlq again after 2 minutes
        jobId: `monitor-${job.data.monitor.id}`,
      },
    );

    await job.remove();
  },
);

emailDlqWorker.on(
  "ready",
  () => {
    console.log(
      "Email DLQ Worker ready",
    );
  },
);

emailDlqWorker.on(
  "error",
  (err) => {
    console.error(err);
  },
);