"use client";

import { Bell } from "lucide-react";

interface EmailNotificationHeaderProps {
  protectedMonitors: number;
  totalRecipients: number;
}

export function EmailNotificationHeader({
  protectedMonitors,
  totalRecipients,
}: EmailNotificationHeaderProps) {
  return (
    <div className="relative flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-xl"
          style={{
            background: "rgba(139,92,246,.10)",
          }}
        >
          <Bell
            className="h-5 w-5"
            style={{
              color: "#a78bfa",
            }}
          />
        </div>

        <div>
          <h3
            className="text-lg font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Email Notifications
          </h3>

          <p
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {protectedMonitors} monitors protected
          </p>
        </div>
      </div>

      <div
        className="rounded-full px-3 py-1 text-xs font-semibold"
        style={{
          background: "rgba(34,197,94,.12)",
          color: "var(--status-healthy)",
        }}
      >
        {totalRecipients} Recipients
      </div>
    </div>
  );
}