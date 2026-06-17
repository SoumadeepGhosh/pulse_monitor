"use client";

import { useMemo, useState } from "react";

import {
  ActivityCalendar,
  type Activity,
} from "react-activity-calendar";

import { CheckResult } from "../../../../generated/prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  generateHeatmapData,
  HeatmapDay,
} from "@/lib/heatmap-metrics";

interface Props {
  monitorName: string;
  checkResults: CheckResult[];
}

export function AvailabilityHeatmap({
  monitorName,
  checkResults,
}: Props) {
  const currentYear =
    new Date().getFullYear();

  const years = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
  ];

  const [
    selectedYear,
    setSelectedYear,
  ] = useState(currentYear);

  const [
    selectedDay,
    setSelectedDay,
  ] = useState<HeatmapDay | null>(
    null,
  );

  const filteredResults =
    checkResults.filter(
      (check) =>
        new Date(
          check.checkedAt,
        ).getFullYear() ===
        selectedYear,
    );

  const heatmapData =
    generateHeatmapData(
      filteredResults,
      selectedYear,
    );

  const dayMap = useMemo(
    () =>
      new Map(
        heatmapData.map((day) => [
          day.date,
          day,
        ]),
      ),
    [heatmapData],
  );

  const activityData: Activity[] =
    heatmapData.map((day) => ({
      date: day.date.replaceAll(
        "/",
        "-",
      ),
      count:
        day.totalChecks === 0
          ? 0
          : day.successRate,
      level:
        day.totalChecks === 0
          ? 0
          : day.successRate === 100
            ? 4
            : day.successRate >= 75
              ? 3
              : day.successRate >= 50
                ? 2
                : 1,
    }));

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Availability History
          </h2>

          <p className="text-sm text-muted-foreground">
            GitHub-style uptime
            visualization
          </p>
        </div>

        <Select
          value={String(
            selectedYear,
          )}
          onValueChange={(
            value,
          ) => {
            setSelectedYear(
              Number(value),
            );

            setSelectedDay(
              null,
            );
          }}
        >
          <SelectTrigger className="w-30">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {years.map((year) => (
              <SelectItem
                key={year}
                value={String(
                  year,
                )}
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <ActivityCalendar
          data={activityData}
          blockSize={11}
          blockMargin={3}
          fontSize={12}
          theme={{
            light: [
              "#ebedf0",
              "#ef4444",
              "#f59e0b",
              "#84cc16",
              "#22c55e",
            ],
            dark: [
              "#161b22",
              "#ef4444",
              "#f59e0b",
              "#84cc16",
              "#22c55e",
            ],
          }}
          eventHandlers={{
            onClick: (
              event,
              activity,
            ) => {
              const day =
                dayMap.get(
                  activity.date.replaceAll(
                    "-",
                    "/",
                  ),
                );

              if (day) {
                setSelectedDay(
                  day,
                );
              }
            },
          }}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-green-500" />
          <span>100% Healthy</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-lime-500" />
          <span>75%+</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-yellow-500" />
          <span>50%+</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-red-500" />
          <span>&lt; 50%</span>
        </div>
      </div>

      {selectedDay && (
        <div className="mt-6 rounded-xl border bg-muted/30 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">
              {monitorName}
            </h3>

            <p className="text-sm text-muted-foreground">
              {
                selectedDay.date
              }
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Success Rate
              </p>

              <p className="text-2xl font-bold text-green-600">
                {
                  selectedDay.successRate
                }
                %
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Failure Rate
              </p>

              <p className="text-2xl font-bold text-red-600">
                {
                  selectedDay.failureRate
                }
                %
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Successful Checks
              </p>

              <p className="text-2xl font-bold">
                {
                  selectedDay.successfulChecks
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Failed Checks
              </p>

              <p className="text-2xl font-bold">
                {
                  selectedDay.failedChecks
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Checks
              </p>

              <p className="text-2xl font-bold">
                {
                  selectedDay.totalChecks
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}