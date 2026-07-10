"use client";

import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface SuccessCriteriaFooterProps {
  protectedCount: number;
  unprotectedCount: number;
}

export function SuccessCriteriaFooter({
  protectedCount,
  unprotectedCount,
}: SuccessCriteriaFooterProps) {
  return (
    <div
      className="
      mx-2
        rounded-2xl
        border
        border-white/10
        dark:border-white/6
        bg-background/50
        dark:bg-white/[0.02]
        backdrop-blur-xl
        p-6
      "
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div
            className="flex items-center gap-2 text-sm font-medium"
            style={{
              color: "var(--status-healthy)",
            }}
          >
            <CheckCircle2 className="h-4 w-4" />
            {protectedCount} monitors protected
          </div>

          {unprotectedCount > 0 && (
            <div
              className="flex items-center gap-2 text-sm"
              style={{
                color: "var(--status-warning)",
              }}
            >
              <AlertTriangle className="h-4 w-4" />
              {unprotectedCount} monitors still missing validation rules
            </div>
          )}
        </div>

        <Link
          href="/success-criteria"
          className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{
            color: "var(--accent-primary)",
          }}
        >
          View Success Criteria
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
