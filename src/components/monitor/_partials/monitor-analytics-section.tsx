"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  successfulChecks: number;
  failedChecks: number;
}

export function SuccessFailureChart({ successfulChecks, failedChecks }: Props) {
  const data = [
    {
      name: "Success",
      value: successfulChecks,
    },
    {
      name: "Failed",
      value: failedChecks,
    },
  ];

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">Success vs Failure</h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              <Cell fill="#22c55e" />

              <Cell fill="#ef4444" />
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
