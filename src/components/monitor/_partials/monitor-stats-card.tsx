import { Activity, Timer, ShieldCheck, BarChart3 } from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
}

export function MonitorStatsCard({ title, value }: Props) {
  const getConfig = () => {
    switch (title) {
      case "Status":
        return {
          icon: Activity,
          iconClass: value === "UP" ? "text-emerald-500" : "text-red-500",
          bgClass: value === "UP" ? "bg-emerald-500/10" : "bg-red-500/10",
        };

      case "Average Response":
        return {
          icon: Timer,
          iconClass: "text-blue-500",
          bgClass: "bg-blue-500/10",
        };

      case "Successful Checks":
        return {
          icon: ShieldCheck,
          iconClass: "text-emerald-500",
          bgClass: "bg-emerald-500/10",
        };

      case "Total Checks":
        return {
          icon: BarChart3,
          iconClass: "text-orange-500",
          bgClass: "bg-orange-500/10",
        };

      default:
        return {
          icon: Activity,
          iconClass: "text-muted-foreground",
          bgClass: "bg-muted",
        };
    }
  };

  const config = getConfig();

  const Icon = config.icon;

  return (
    <Card
      className="
        relative
        overflow-hidden
        border
        p-5
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div
        className={`
          absolute
          right-0
          top-0
          h-20
          w-20
          rounded-full
          blur-3xl
          ${config.bgClass}
        `}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight">{value}</h3>
        </div>

        <div
          className={`
            flex h-12 w-12 items-center justify-center
            rounded-xl
            ${config.bgClass}
          `}
        >
          <Icon className={`h-6 w-6 ${config.iconClass}`} />
        </div>
      </div>
    </Card>
  );
}
