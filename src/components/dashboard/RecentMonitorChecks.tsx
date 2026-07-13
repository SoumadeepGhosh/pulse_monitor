"use client";

import { motion } from "framer-motion";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Globe,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { RecentMonitorCheck } from "@/types/dashboard.type";

interface RecentMonitorChecksProps {
  checks: RecentMonitorCheck[];
}

export function RecentMonitorChecks({ checks }: RecentMonitorChecksProps) {
  const totalChecks = checks.length;

  const successCount = checks.filter((check) => check.status === "UP").length;

  const failedCount = totalChecks - successCount;

  const latestCheck = checks.length > 0 ? checks[0].checkedAt : null;

  const overallStatus =
    failedCount === 0
      ? "Operational"
      : successCount >= failedCount
        ? "Degraded"
        : "Critical";
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
      }}
      className="
        relative
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
      {/* Ambient glow, gives the "liquid glass" depth */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-[120px]" />

      {/* Header */}

      <div className="relative flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(59,130,246,.10)",
            }}
          >
            <Activity
              className="h-5 w-5"
              style={{
                color: "var(--accent-primary)",
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
              Recent Monitor Checks
            </h3>

            <p
              className="text-sm"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Latest monitoring activity across all endpoints.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="
            gap-2
            rounded-xl
            border-white/10
            bg-background/70
            dark:bg-card/40
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-blue-400/30
            hover:bg-blue-500/5
          "
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* List */}

      <div className="relative space-y-3 px-4 pb-2">
        {checks.map((check) => {
          const isHealthy = check.status === "UP";

          return (
            <motion.div
              key={check.id}
              whileHover={{
                y: -2,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                group
                relative
                overflow-hidden
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                dark:border-white/[0.06]
                bg-background/50
                dark:bg-white/[0.02]
                backdrop-blur-xl
                px-5
                py-4
                transition-all
                duration-300
                hover:border-white/20
                dark:hover:border-white/10
                hover:shadow-[0_8px_30px_rgba(59,130,246,.08)]
              "
            >
              {/* Liquid shine sweep on hover */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.06]
                  to-transparent
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:translate-x-full
                "
              />

              {/* Left */}

              <div className="relative flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: isHealthy
                      ? "rgba(34,197,94,.12)"
                      : "rgba(239,68,68,.12)",
                  }}
                >
                  {isHealthy ? (
                    <CheckCircle2
                      className="h-6 w-6"
                      style={{
                        color: "var(--status-healthy)",
                      }}
                    />
                  ) : (
                    <XCircle
                      className="h-6 w-6"
                      style={{
                        color: "var(--status-critical)",
                      }}
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h4
                      className="font-semibold"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    >
                      {check.monitorName}
                    </h4>

                    <span
                      className="rounded-full px-2 py-1 text-[11px] font-semibold"
                      style={{
                        background: check.isActive
                          ? "rgba(34,197,94,.12)"
                          : "rgba(251,191,36,.12)",

                        color: check.isActive
                          ? "var(--status-healthy)"
                          : "#f59e0b",
                      }}
                    >
                      {check.isActive ? "ACTIVE" : "PAUSED"}
                    </span>
                  </div>

                  <div
                    className="mt-2 flex items-center gap-4 text-sm"
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      HTTP {check.statusCode}
                    </span>

                    <span className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />

                      {check.responseTime ? `${check.responseTime} ms` : "--"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />

                      {new Date(check.checkedAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}

              <div className="relative flex items-center gap-4">
                <span
                  className="rounded-full px-4 py-2 text-xs font-semibold"
                  style={{
                    background: isHealthy
                      ? "rgba(34,197,94,.12)"
                      : "rgba(239,68,68,.12)",

                    color: isHealthy
                      ? "var(--status-healthy)"
                      : "var(--status-critical)",
                  }}
                >
                  {check.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="relative px-6 py-5">
        <div
          className="
      rounded-2xl
      bg-background/40
      backdrop-blur-xl
      p-5
    "
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}

            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background:
                    overallStatus === "Operational"
                      ? "rgba(34,197,94,.12)"
                      : overallStatus === "Degraded"
                        ? "rgba(245,158,11,.12)"
                        : "rgba(239,68,68,.12)",
                }}
              >
                <CheckCircle2
                  className="h-6 w-6"
                  style={{
                    color:
                      overallStatus === "Operational"
                        ? "#22c55e"
                        : overallStatus === "Degraded"
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                />
              </div>

              <div>
                <h4
                  className="font-semibold"
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  Recent Activity Summary
                </h4>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {successCount} successful • {failedCount} failed monitor
                  checks.
                </p>
              </div>
            </div>

            {/* Right */}

            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-2 text-xs font-semibold"
                style={{
                  background:
                    overallStatus === "Operational"
                      ? "rgba(34,197,94,.12)"
                      : overallStatus === "Degraded"
                        ? "rgba(245,158,11,.12)"
                        : "rgba(239,68,68,.12)",

                  color:
                    overallStatus === "Operational"
                      ? "#22c55e"
                      : overallStatus === "Degraded"
                        ? "#f59e0b"
                        : "#ef4444",
                }}
              >
                {overallStatus}
              </span>

              <span
                className="rounded-full px-3 py-2 text-xs font-semibold"
                style={{
                  background: "rgba(59,130,246,.10)",
                  color: "var(--accent-primary)",
                }}
              >
                {latestCheck
                  ? new Date(latestCheck).toLocaleTimeString()
                  : "--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
