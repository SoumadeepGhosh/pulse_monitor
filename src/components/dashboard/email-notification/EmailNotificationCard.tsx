"use client";

import { motion } from "framer-motion";

import { EmailNotificationCoverage } from "./EmailNotificationCoverage";
import { EmailNotificationFooter } from "./EmailNotificationFooter";
import { EmailNotificationHeader } from "./EmailNotificationHeader";
import { EmailNotificationMetrics } from "./EmailNotificationMetrics";
import { EmailNotificationDashboard } from "@/types/dashboard.type";
import { Mail, Link2, Unlink, BellRing } from "lucide-react";
interface EmailNotificationCardProps {
  data: EmailNotificationDashboard;
}

export function EmailNotificationCard({ data }: EmailNotificationCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: 0.05,
      }}
      className="
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        dark:border-white/[0.06]
        bg-background/70
        dark:bg-card/40
        backdrop-blur-2xl
        shadow-[0_10px_40px_rgba(0,0,0,.06)]
        dark:shadow-[0_20px_60px_rgba(0,0,0,.35)]
      "
    >
      {/* Ambient lighting layer */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-blue-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-white/[0.05] blur-[100px]" />

      <EmailNotificationHeader
        protectedMonitors={data.protectedMonitors}
        totalRecipients={data.totalRecipients}
      />

      <div className="relative flex flex-1 flex-col gap-8 px-8 pb-10">
        <EmailNotificationMetrics
          kpis={[
            {
              id: "recipients",
              label: "Recipients",
              value: data.totalRecipients,
              icon: Mail,
              accent: "blue",
            },
            {
              id: "assigned",
              label: "Assigned",
              value: data.assignedRecipients,
              icon: Link2,
              accent: "emerald",
            },
            {
              id: "unassigned",
              label: "Unassigned",
              value: data.unassignedRecipients,
              icon: Unlink,
              accent: "amber",
            },
            {
              id: "most-used",
              label: "Most Used",
              value: `${data.mostUsedRecipientName}`,
              icon: BellRing,
              accent: "violet",
            },
          ]}
        />

        <EmailNotificationCoverage
          coverage={{
            protected: data.protectedMonitors,
            unprotected: data.monitorsWithoutRecipients,
          }}
        />

        <div className="mt-auto pt-2">
          <EmailNotificationFooter
            recipientCount={data.totalRecipients}
            unassignedMonitorCount={data.monitorsWithoutRecipients}
          />
        </div>

        <div className="h-2 shrink-0" aria-hidden="true" />
      </div>
    </motion.div>
  );
}
