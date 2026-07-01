import { Queue } from "bullmq";

import { redis } from "@/lib/redis";

export const EMAIL_QUEUE =
  "email-send";

export const emailQueue = new Queue(EMAIL_QUEUE, {
    connection: redis as any,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true, // remove once job is completed for scheduler from redis
    },
});