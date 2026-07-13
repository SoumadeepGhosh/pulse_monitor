"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

import { DashboardFilter as DashboardFilterType } from "@/types/dashboard.type";

interface DashboardFilterProps {
  value: DashboardFilterType;
}

const FILTERS: {
  label: string;
  value: DashboardFilterType;
}[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
];

export function DashboardFilter({
  value,
}: DashboardFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function changeFilter(
    filter: DashboardFilterType,
  ) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set("filter", filter);

    router.push(`/dashboard?${params.toString()}`);
  }

  return (
    <div
      className="
        inline-flex
        rounded-2xl
        border
        border-white/10
        bg-background/70
        dark:bg-card/40
        p-1
        backdrop-blur-xl
      "
    >
      {FILTERS.map((item) => (
        <button
          key={item.value}
          onClick={() => changeFilter(item.value)}
          className={cn(
            "rounded-xl px-5 py-2 text-sm font-medium transition-all duration-300",

            value === item.value
              ? "bg-blue-500 text-white shadow-lg"
              : "text-muted-foreground hover:text-white hover:bg-white/5",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}