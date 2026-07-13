import { Queue } from "bullmq";

import { redis } from "@/lib/redis";

export const EMAIL_DLQ =
  "email-send-dlq";

export const emailDlq =
  new Queue(EMAIL_DLQ, {
    connection: redis as any,

    defaultJobOptions: {
      attempts: 3,

      backoff: {
        type: "exponential",
        delay: 1000,
      },

      removeOnComplete: true,
    },
  });