import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
}

export function MonitorStatsCard({
  title,
  value,
}: Props) {
  return (
    <Card className="p-6">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </Card>
  );
}