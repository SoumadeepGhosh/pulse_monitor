import { Badge } from "@/components/ui/badge";

const history = ["UP", "UP", "UP", "DOWN", "UP", "UP", "UP"];

export function UptimeTimeline() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">Uptime Timeline</h2>

      <div className="flex flex-wrap gap-2">
        {history.map((status, index) => (
          <Badge
            key={index}
            variant={status === "UP" ? "default" : "destructive"}
          >
            {status}
          </Badge>
        ))}
      </div>
    </div>
  );
}
