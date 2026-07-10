"use client";

import { LiquidProgressBar } from "@/components/dashboard/LiquidProgressBar";
import { DistributionItem } from "@/types/types";

interface SuccessCriteriaDistributionProps {
  distribution: DistributionItem[];
}

export function SuccessCriteriaDistribution({
  distribution,
}: SuccessCriteriaDistributionProps) {
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
        p-5
        space-y-5
      "
    >
      <h4
        className="text-sm font-semibold uppercase tracking-wide"
        style={{
          color: "var(--text-tertiary)",
        }}
      >
        Rule Distribution
      </h4>

      <div className="space-y-4">
        {distribution.map((item, index) => (
          <LiquidProgressBar
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}