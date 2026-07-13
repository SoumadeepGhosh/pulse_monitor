"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Clock3,
  Sparkles,
} from "lucide-react";

interface DashboardGreetingProps {
  userName: string;
  workspaceName?: string;
}

export function DashboardGreeting({
  userName,
  workspaceName = "Personal Workspace",
}: DashboardGreetingProps) {
  const [greeting, setGreeting] = useState("Welcome");
  const [today, setToday] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <div className="max-w-3xl space-y-6">
      {/* Workspace */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-background/70
          dark:bg-card/40
          px-4
          py-2
          backdrop-blur-xl
        "
      >
        <div className="rounded-full bg-blue-500/10 p-1.5">
          <Building2 className="h-3.5 w-3.5 text-blue-500" />
        </div>

        <span
          className="text-xs font-semibold"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          {workspaceName}
        </span>
      </div>

      {/* Greeting */}

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Sparkles
            className="h-7 w-7"
            style={{
              color: "var(--accent-primary)",
            }}
          />

          <span
            className="text-lg font-medium"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {greeting}
          </span>
        </div>

        <h1
          className="text-5xl font-black tracking-tight"
          style={{
            color: "var(--text-primary)",
          }}
        >
          {userName}
        </h1>

        <p
          className="max-w-3xl text-base leading-8"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Monitor infrastructure, track uptime, detect incidents,
          analyze performance and receive real-time alerts from one
          intelligent monitoring platform.
        </p>
      </div>

      {/* Date */}

      <div
        className="flex items-center gap-2 text-sm"
        style={{
          color: "var(--text-tertiary)",
        }}
      >
        <Clock3 className="h-4 w-4" />
        {today}
      </div>
    </div>
  );
}