import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { MonitorOverviewCard } from "@/components/monitor/_partials/monitor-overview-card";
import { MonitorStatsCard } from "@/components/monitor/_partials/monitor-stats-card";
import { ResponseTimeChart } from "@/components/monitor/_partials/response-time-chart";
import { UptimeTimeline } from "@/components/monitor/_partials/uptime-timeline";
import { CheckHistoryTable } from "@/components/monitor/_partials/monitor-check-history-table";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MonitorDetailsPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/monitor">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      <MonitorOverviewCard />

      <div className="grid gap-4 md:grid-cols-4">
        <MonitorStatsCard title="Status" value="UP" />

        <MonitorStatsCard title="Method" value="GET" />

        <MonitorStatsCard title="Response Time" value="145ms" />

        <MonitorStatsCard title="Uptime" value="99.9%" />
      </div>

      <ResponseTimeChart />

      <UptimeTimeline />

      <CheckHistoryTable />
    </div>
  );
}
