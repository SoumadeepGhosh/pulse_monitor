import "./monitor.worker";
import "./email.worker";
import "./email-dlq.worker";
import { monitorQueue } from "@/queues/monitor.queue";
import { emailQueue } from "@/queues/email.queue";
import { emailDlq } from "@/queues/email-dlq.queue";

console.log("🚀 Workers Started");

monitorQueue
  .getJobCounts()
  .then(console.log)
  .catch(console.error);

emailQueue
  .getJobCounts()
  .then(console.log)
  .catch(console.error);

emailDlq
  .getJobCounts()
  .then(console.log)
  .catch(console.error);
