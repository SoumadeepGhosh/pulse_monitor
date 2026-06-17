import { Activity, Clock3, Globe } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { Monitor } from "../../../../generated/prisma/client";

interface Props {
  monitor: Monitor;
}

export function MonitorOverviewCard({ monitor }: Props) {
  const isUp = monitor.status === "UP";

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-xl
                bg-blue-500/10
                text-blue-600
                dark:text-blue-400
              "
            >
              <Globe className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {monitor.name}
                </h1>

                <Badge
                  className={
                    isUp
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
                  }
                >
                  {monitor.status}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">Endpoint Monitor</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed bg-muted/40 p-4">
            <div className="flex items-start gap-3">
              <Globe className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

              <p className="break-all text-sm font-medium">{monitor.url}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="
              gap-2
              border-blue-500/20
              bg-blue-500/5
              px-3 py-1
              text-blue-600
              dark:text-blue-400
            "
          >
            <Activity className="h-3.5 w-3.5" />
            {monitor.method}
          </Badge>

          <Badge
            variant="outline"
            className="
              gap-2
              border-violet-500/20
              bg-violet-500/5
              px-3 py-1
              text-violet-600
              dark:text-violet-400
            "
          >
            <Clock3 className="h-3.5 w-3.5" />
            Every {monitor.intervalMinutes} min
          </Badge>
        </div>
      </div>
    </Card>
  );
}
