"use client";

import {
  Activity,
  Clock3,
  Gauge,
  Timer,
} from "lucide-react";

import { DashboardHeaderMetrics } from "@/types/dashboard.type";

import { HeaderMetricCard } from "./HeaderMetricCard";

interface HeaderMetricsProps {
  metrics: DashboardHeaderMetrics;
}

export function HeaderMetrics({
  metrics,
}: HeaderMetricsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <HeaderMetricCard
        title="Monitors"
        value={metrics.totalMonitors}
        icon={<Activity className="h-5 w-5" />}
        accent="emerald"
      />

      <HeaderMetricCard
        title="Checks"
        value={metrics.totalChecks.toLocaleString()}
        icon={<Clock3 className="h-5 w-5" />}
        accent="blue"
      />

      <HeaderMetricCard
        title="Latency"
        value={
          metrics.averageLatency !== null
            ? `${Math.round(metrics.averageLatency)} ms`
            : "--"
        }
        icon={<Gauge className="h-5 w-5" />}
        accent="amber"
      />

      <HeaderMetricCard
        title="Uptime"
        value={
          metrics.uptimePercentage !== null
            ? `${metrics.uptimePercentage.toFixed(2)}%`
            : "--"
        }
        icon={<Timer className="h-5 w-5" />}
        accent="violet"
      />
    </div>
  );
}