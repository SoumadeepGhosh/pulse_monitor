"use client";

import { motion } from "framer-motion";
import { Activity, RefreshCw } from "lucide-react";
import { StatBox } from "./StatBox";
import { PlatformStatus } from "@/types/dashboard.type";

interface PlatformHealthCardProps {
  status: PlatformStatus;
  uptime: number | null;
  latency: number | null;
  healthScore: number;
  incidents: number;
}
export function PlatformHealthCard({
  status,
  uptime,
  latency,
  healthScore,
  incidents,
}: PlatformHealthCardProps) {
  const statusText =
    status === "operational"
      ? "Healthy"
      : status === "degraded"
        ? "Degraded"
        : "Critical";

  const statusBadge =
    status === "operational"
      ? "LIVE"
      : status === "degraded"
        ? "WARNING"
        : "CRITICAL";

  const statusColor =
    status === "operational"
      ? "var(--status-healthy)"
      : status === "degraded"
        ? "var(--status-warning)"
        : "var(--status-critical)";
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-emerald-500/15
        dark:border-emerald-400/10
bg-background/60
dark:bg-card/60
        backdrop-blur-xl
        p-6
        transition-all
        duration-300
        hover:border-emerald-500/30
        hover:shadow-lg
        hover:shadow-emerald-500/10
      "
      style={{
        background: `
    linear-gradient(
      180deg,
      rgba(255,255,255,.04),
      rgba(255,255,255,.01)
    ),
    radial-gradient(
      circle at top right,
      ${
        status === "operational"
          ? "rgba(34,197,94,.16)"
          : status === "degraded"
            ? "rgba(245,158,11,.16)"
            : "rgba(239,68,68,.16)"
      },
      transparent 45%
    )
  `,
      }}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/12">
            <Activity
              className="h-6 w-6"
              style={{
                color: statusColor,
              }}
            />
          </div>

          <div
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: `${statusColor}20`,
              color: statusColor,
            }}
          >
            {statusBadge}
          </div>
        </div>

        <div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Platform Health
          </p>
          <h2
            className="mt-2 text-4xl font-black"
            style={{ color: statusColor }}
          >
            {statusText}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatBox
            label="Uptime"
            value={uptime !== null ? `${uptime.toFixed(2)}%` : "--"}
            color="emerald"
          />

          <StatBox
            label="Latency"
            value={latency !== null ? `${Math.round(latency)} ms` : "--"}
            color="blue"
          />

          <StatBox
            label="Health Score"
            value={`${healthScore}%`}
            color="violet"
          />

          <StatBox
            label="Incidents"
            value={incidents.toString()}
            color={incidents > 0 ? "amber" : "emerald"}
          />
        </div>

        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Updated live
        </div>
      </div>
    </motion.div>
  );
}
