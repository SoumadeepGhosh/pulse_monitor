"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import {
  DashboardFilter as DashboardFilterType,
  DashboardOverview,
} from "@/types/dashboard.type";

import { DashboardGreeting } from "./DashboardGreeting";
import { DashboardFilter } from "./DashboardFilter";
import { HeaderMetrics } from "./HeaderMetrics";
import { DashboardActions } from "./DashboardActions";

interface DashboardHeaderProps {
  userName: string;
  workspaceName?: string;
  overview: DashboardOverview;
  filter: DashboardFilterType;
  onViewAlerts?: () => void;
}

export function DashboardHeader({
  userName,
  workspaceName = "Personal Workspace",
  overview,
  filter,
  onViewAlerts,
}: DashboardHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={cn(
        "group",
        "relative",
        "overflow-hidden",
        "rounded-[32px]",
        "border",
        "border-white/10",
        "dark:border-white/[0.06]",
        "backdrop-blur-3xl",
        "shadow-[0_10px_60px_rgba(0,0,0,.08)]",
        "dark:shadow-[0_30px_80px_rgba(0,0,0,.45)]",
        "transition-all",
        "duration-500",
        "hover:-translate-y-1",
        "hover:border-blue-400/20",
        "dark:hover:border-blue-400/10",
        "hover:shadow-blue-500/10",
      )}
      style={{
        background: "var(--bg-surface)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)`,
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-blue-500/20 blur-[160px]" />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-violet-500/20 blur-[150px]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-[140px]" />

      <div className="relative space-y-8 p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <DashboardGreeting
            userName={userName}
            workspaceName={workspaceName}
          />
          <div className="flex justify-end self-start">
            <DashboardFilter value={filter} />
          </div>
        </div>

        <HeaderMetrics metrics={overview.header} />

        <DashboardActions onViewAlerts={onViewAlerts} />
      </div>
    </motion.section>
  );
}
