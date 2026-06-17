"use client";

import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

import { Clock3 } from "lucide-react";

import { CheckResult } from "../../../../generated/prisma/client";

interface Props {
  checkResults: CheckResult[];
}

export function ResponseTimeChart({ checkResults }: Props) {
  const data = [...checkResults].reverse().map((result) => ({
    time: new Date(result.checkedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    responseTime: result.responseTime ?? 0,
  }));

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-6 flex items-center gap-2">
        <div className="rounded-lg bg-blue-500/10 p-2">
          <Clock3 className="h-4 w-4 text-blue-500" />
        </div>

        <div>
          <h2 className="font-semibold">Response Time History</h2>

          <p className="text-sm text-muted-foreground">
            Response latency over time
          </p>
        </div>
      </div>

      <div className="h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />

                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.2}
            />

            <XAxis
              dataKey="time"
              tick={{
                fontSize: 12,
              }}
              minTickGap={40}
              tickMargin={10}
            />

            <YAxis
              tick={{
                fontSize: 12,
              }}
              tickMargin={10}
              unit="ms"
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
              }}
              formatter={(value) => [`${value} ms`, "Response Time"]}
            />

            <Area
              type="monotone"
              dataKey="responseTime"
              stroke="none"
              fill="url(#responseGradient)"
            />

            <Line
              type="monotone"
              dataKey="responseTime"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
