"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CheckResult } from "../../../../generated/prisma/client";

interface Props {
  checkResults: CheckResult[];
}

export function ResponseTimeChart({ checkResults }: Props) {
  const data = [...checkResults].reverse().map((result) => ({
    time: new Date(result.checkedAt).toLocaleTimeString(),
    responseTime: result.responseTime ?? 0,
  }));

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">Response Time History</h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="responseTime" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
