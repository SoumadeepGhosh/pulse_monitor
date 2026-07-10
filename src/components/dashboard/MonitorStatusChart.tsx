"use client";

import { DashboardOverview } from "@/types/dashboard.type";
import { motion } from "framer-motion";

import { Activity, CheckCircle2, PauseCircle, XCircle } from "lucide-react";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface MonitorStatusChartProps {
  overview: DashboardOverview;
}

export function MonitorStatusChart({ overview }: MonitorStatusChartProps) {
  const total = overview.monitorSummary.total;
  const down = overview.monitorSummary.down;

  const isAllHealthy = down === 0;

  const data = [
    {
      name: "Online",
      value: overview.monitorSummary.healthy,
      color: "#22c55e",
      icon: CheckCircle2,
    },
    {
      name: "Down",
      value: overview.monitorSummary.down,
      color: "#ef4444",
      icon: XCircle,
    },
    {
      name: "Paused",
      value: overview.monitorSummary.paused,
      color: "#f59e0b",
      icon: PauseCircle,
    },
    {
      name: "Unknown",
      value: overview.monitorSummary.unknown,
      color: "#94a3b8",
      icon: Activity,
    },
  ];

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

      <div className="relative flex items-center justify-between gap-3 px-6 py-5">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
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

          <div className="min-w-0">
            <h3
              className="truncate text-lg font-bold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              Monitor Status
            </h3>

            <p
              className="truncate text-sm"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Real-time monitor health distribution.
            </p>
          </div>
        </div>

        <div
          className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: "rgba(34,197,94,.12)",
            color: "var(--status-healthy)",
          }}
        >
          {total} Total
        </div>
      </div>

      {/*
        Layout note: this card is often rendered at ~half viewport width
        (side-by-side with RecentMonitorChecks), not full width. The
        chart/list split only activates at `xl` — matching the breakpoint
        where the outer dashboard grid itself goes 2-column — so this
        card never gets squeezed into a fixed 320px + leftover sliver.
        Both grid children get `min-w-0` so nothing overflows if the
        available space is ever tighter than expected.
      */}
      <div className="relative grid items-center gap-6 p-6 xl:grid-cols-[260px_1fr]">
        <div className="relative min-w-0 h-[280px] xl:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={78}
                outerRadius={105}
                dataKey="value"
                stroke="none"
                paddingAngle={5}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4">
            {/* soft glow behind the number so the center doesn't look flat/empty */}
            <div
              className="absolute h-40 w-40 rounded-full blur-2xl"
              style={{
                background: isAllHealthy
                  ? "rgba(34,197,94,.14)"
                  : "rgba(239,68,68,.12)",
              }}
            />

            <span
              className="relative text-5xl font-black"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {total}
            </span>

            <span
              className="relative mt-2 text-sm"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Total Monitors
            </span>

            <div
              className="
                relative
                mt-4
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
              "
              style={{
                background: isAllHealthy
                  ? "rgba(34,197,94,.14)"
                  : "rgba(239,68,68,.14)",
                color: isAllHealthy
                  ? "var(--status-healthy)"
                  : "var(--status-critical)",
              }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background: isAllHealthy ? "#22c55e" : "#ef4444",
                }}
              />
              {isAllHealthy ? "All Systems Go" : `${down} Need Attention`}
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          {data.map((item) => {
            const Icon = item.icon;

            const percentage =
              total === 0 ? 0 : Math.round((item.value / total) * 100);

            return (
              <motion.div
                key={item.name}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  group
                  relative
                  min-w-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  dark:border-white/[0.06]
                  bg-background/50
                  dark:bg-white/[0.02]
                  backdrop-blur-xl
                  p-4
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

                <div className="relative flex min-w-0 items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: `${item.color}18`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{
                          color: item.color,
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <h4
                        className="truncate font-semibold"
                        style={{
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.name}
                      </h4>

                      <p
                        className="truncate text-sm"
                        style={{
                          color: "var(--text-secondary)",
                        }}
                      >
                        {item.value} Monitor
                        {item.value > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div
                      className="text-2xl font-black"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    >
                      {percentage}%
                    </div>

                    <div
                      className="text-xs"
                      style={{
                        color: "var(--text-tertiary)",
                      }}
                    >
                      Distribution
                    </div>
                  </div>
                </div>

                {/* Progress */}

                <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{
                      background: item.color,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-4 p-6 pt-0 xl:grid-cols-4">
        {data.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              whileHover={{
                y: -2,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                group
                relative
                min-w-0
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                dark:border-white/[0.06]
                bg-background/50
                dark:bg-white/[0.02]
                backdrop-blur-xl
                p-4
                transition-all
                duration-300
                hover:border-white/20
                dark:hover:border-white/10
              "
            >
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

              <div className="relative flex min-w-0 items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `${item.color}18`,
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{
                      color: item.color,
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className="truncate text-xs"
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item.name}
                  </p>

                  <h3
                    className="truncate text-2xl font-bold"
                    style={{
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.value}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}