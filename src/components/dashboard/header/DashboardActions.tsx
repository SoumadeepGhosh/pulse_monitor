"use client";

import { BellRing, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DashboardActionsProps {
  onCreateMonitor?: () => void;
  onViewAlerts?: () => void;
}

export function DashboardActions({
  onCreateMonitor,
  onViewAlerts,
}: DashboardActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={onCreateMonitor}
        className="
          h-11
          flex-1
          min-w-[170px]
          gap-2
          rounded-xl
          transition-all
          duration-300
          hover:scale-[1.02]
        "
        style={{
          background: "var(--accent-primary)",
        }}
      >
        <PlusCircle className="h-4 w-4" />
        Create Monitor
      </Button>

      <Button
        variant="outline"
        onClick={onViewAlerts}
        className="
          h-11
          flex-1
          min-w-[170px]
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
        <BellRing className="h-4 w-4" />
        View Alerts
      </Button>
    </div>
  );
}