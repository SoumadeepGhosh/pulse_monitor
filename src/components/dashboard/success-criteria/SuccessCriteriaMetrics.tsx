"use client";

import { GlassKpiCard } from "@/components/dashboard/GlassKpiCard";
import { KpiItem } from "@/types/types";

interface SuccessCriteriaMetricsProps {
  kpis: KpiItem[];
}

export function SuccessCriteriaMetrics({
  kpis,
}: SuccessCriteriaMetricsProps) {
  return (
    <div className="px-2 grid grid-cols-2 gap-4 xl:grid-cols-4">
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