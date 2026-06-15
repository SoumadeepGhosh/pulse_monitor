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

const data = [
  { time: "10:00", responseTime: 120 },
  { time: "10:05", responseTime: 135 },
  { time: "10:10", responseTime: 110 },
  { time: "10:15", responseTime: 180 },
  { time: "10:20", responseTime: 145 },
];

export function ResponseTimeChart() {
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
