"use client";

import { GlassKpiCard } from "@/components/dashboard/GlassKpiCard";
import { KpiItem } from "@/types/types";

interface EmailNotificationMetricsProps {
  kpis: KpiItem[];
}

export function EmailNotificationMetrics({
  kpis,
}: EmailNotificationMetricsProps) {
  return (
   <div className="grid grid-cols-2 gap-4 px-2 xl:grid-cols-4">
      {kpis.map((item, index) => (
        <GlassKpiCard
          key={item.id}
          item={item}
          index={index}
        />
      ))}
    </div>
  );
}