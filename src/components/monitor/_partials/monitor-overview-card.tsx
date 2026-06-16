import { Card } from "@/components/ui/card";
import { Monitor } from "../../../../generated/prisma/client";

interface Props {
  monitor: Monitor;
}

export function MonitorOverviewCard({
  monitor,
}: Props) {
  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold">
        {monitor.name}
      </h1>

      <p className="mt-2 text-muted-foreground">
        {monitor.url}
      </p>
    </Card>
  );
}