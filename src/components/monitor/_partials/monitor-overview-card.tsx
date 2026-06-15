import { Card } from "@/components/ui/card";

export function MonitorOverviewCard() {
  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold">
        Backend Health API
      </h1>

      <p className="mt-2 text-muted-foreground">
        https://api.example.com/health
      </p>
    </Card>
  );
}