"use client";

import { AlertTriangle, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

interface EmailNotificationFooterProps {
  recipientCount: number;
  unassignedMonitorCount: number;
}

export function EmailNotificationFooter({
  recipientCount,
  unassignedMonitorCount,
}: EmailNotificationFooterProps) {
  return (
    <div
      className="
      mx-2
        rounded-2xl
        border
        border-white/10
        dark:border-white/[0.06]
        bg-background/50
        dark:bg-white/[0.02]
        backdrop-blur-xl
        p-6
      "
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div
            className="flex items-center gap-2 text-sm font-medium"
            style={{
              color: "var(--accent-primary)",
            }}
          >
            <Mail className="h-4 w-4" />
            {recipientCount} recipients configured
          </div>

          {unassignedMonitorCount > 0 && (
            <div
              className="flex items-center gap-2 text-sm"
              style={{
                color: "var(--status-warning)",
              }}
            >
              <AlertTriangle className="h-4 w-4" />
              {unassignedMonitorCount} monitors still have no recipients
            </div>
          )}
        </div>

        <Link
          href="/email-recipients"
          className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{
            color: "var(--accent-primary)",
          }}
        >
          Manage Recipients
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
