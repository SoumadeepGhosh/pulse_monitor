"use client";

import { LiquidProgressBar } from "@/components/dashboard/LiquidProgressBar";

interface EmailNotificationCoverageProps {
  coverage: {
    protected: number;
    unprotected: number;
  };
}

export function EmailNotificationCoverage({
  coverage,
}: EmailNotificationCoverageProps) {
  const total =
    coverage.protected + coverage.unprotected;

  const distribution = [
    {
      id: "protected",
      label: "Protected Monitors",
      percentage:
        total === 0
          ? 0
          : Math.round(
              (coverage.protected / total) * 100,
            ),
      accent: "emerald" as const,
    },
    {
      id: "unprotected",
      label: "Without Email",
      percentage:
        total === 0
          ? 0
          : Math.round(
              (coverage.unprotected / total) * 100,
            ),
      accent: "amber" as const,
    },
  ];

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
        Recipient Coverage
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