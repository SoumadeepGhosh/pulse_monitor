"use client";

import { ShieldCheck } from "lucide-react";

interface SuccessCriteriaHeaderProps {
  coverage: number;
}

export function SuccessCriteriaHeader({
  coverage,
}: SuccessCriteriaHeaderProps) {
  return (
    <div className="relative flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-xl"
          style={{
            background: "rgba(59,130,246,.10)",
          }}
        >
          <ShieldCheck
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
            Success Criteria
          </h3>

          <p
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Monitoring rule coverage
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
        {coverage}% Coverage
      </div>
    </div>
  );
}