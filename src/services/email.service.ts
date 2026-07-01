import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { MonitorStatus } from "../../generated/prisma/client";
import { SendMonitorStatusChangedEmailInput } from "@/types/job.type";

export async function sendMonitorStatusChangedEmail({
  monitor,
  recipients,
}: SendMonitorStatusChangedEmailInput): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY is not configured");
  }

  if (recipients.length === 0) {
    throw new Error("No recipients provided");
  }

  sgMail.setApiKey(apiKey);

  const isDown = monitor.status === MonitorStatus.DOWN;

  const msg: MailDataRequired = {
    to: recipients,

    from: {
      email: process.env.SMTP_FROM_EMAIL ?? "",
      name: process.env.SMTP_FROM_NAME ?? "Pulse Monitor",
    },

    subject: `${isDown ? "🔴" : "🟢"} Monitor "${monitor.name}" is ${monitor.status}`,

    html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:24px;border:1px solid #e5e5e5;border-radius:8px">
        
        <h2 style="margin-bottom:8px">
          Monitor Status Changed
        </h2>

        <p>
          Your monitor has changed its status.
        </p>

        <table style="border-collapse:collapse;width:100%;margin-top:20px">
          <tr>
            <td style="padding:8px;font-weight:bold">Monitor</td>
            <td style="padding:8px">${monitor.name}</td>
          </tr>

          <tr>
            <td style="padding:8px;font-weight:bold">URL</td>
            <td style="padding:8px">
              <a href="${monitor.url}">
                ${monitor.url}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:8px;font-weight:bold">Method</td>
            <td style="padding:8px">${monitor.method}</td>
          </tr>

          <tr>
            <td style="padding:8px;font-weight:bold">Current Status</td>
            <td style="padding:8px;font-size:18px">
              ${
                isDown
                  ? '<span style="color:#dc2626;font-weight:bold;">🔴 DOWN</span>'
                  : '<span style="color:#16a34a;font-weight:bold;">🟢 UP</span>'
              }
            </td>
          </tr>

          <tr>
            <td style="padding:8px;font-weight:bold">Checked At</td>
            <td style="padding:8px">
              ${new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short",
              })}
            </td>
          </tr>
        </table>

        <hr style="margin:24px 0"/>

        <p style="color:#666">
          You are receiving this email because notifications are enabled for this monitor.
        </p>

      </div>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("Failed to send email");

    throw error;
  }
}