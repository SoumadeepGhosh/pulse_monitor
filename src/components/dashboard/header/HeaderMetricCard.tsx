"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeaderMetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  accent?: "blue" | "emerald" | "amber" | "violet";
}

const ACCENT_STYLES = {
  blue: {
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    border: "hover:border-blue-500/30",
    glow: "hover:shadow-blue-500/10",
  },

  emerald: {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    border: "hover:border-emerald-500/30",
    glow: "hover:shadow-emerald-500/10",
  },

  amber: {
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    border: "hover:border-amber-500/30",
    glow: "hover:shadow-amber-500/10",
  },

  violet: {
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
    border: "hover:border-violet-500/30",
    glow: "hover:shadow-violet-500/10",
  },
};

export function HeaderMetricCard({
  title,
  value,
  icon,
  accent = "blue",
}: HeaderMetricCardProps) {
  const style = ACCENT_STYLES[accent];

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-background/70
        dark:bg-card/40
        px-5
        py-4
        backdrop-blur-xl
        transition-all
        duration-300
        ${style.border}
        ${style.glow}
      `}
    >
      <div
        className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          ${style.iconBg}
          ${style.iconColor}
        `}
      >
        {icon}
      </div>

      <div className="space-y-1">
        <p
          className="text-xs font-medium uppercase tracking-wide"
          style={{
            color: "var(--text-tertiary)",
          }}
        >
          {title}
        </p>

        <h3
          className="text-2xl font-bold tracking-tight"
          style={{
            color: "var(--text-primary)",
          }}
        >
          {value}
        </h3>
      </div>
    </motion.div>
  );
}