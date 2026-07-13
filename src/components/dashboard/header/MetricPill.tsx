"use client";

import { motion } from "framer-motion";
import { ACCENT_STYLES, type AccentColor } from "@/lib/dashboard-accent-styles";

interface MetricPillProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: AccentColor;
}

export function MetricPill({ icon, title, value, color }: MetricPillProps) {
  const accent = ACCENT_STYLES[color];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`
        group/pill
        flex
        items-center
        gap-3
        rounded-2xl
        border
        ${accent.border}
bg-background/70
dark:bg-card/60
        backdrop-blur-xl
        px-4
        py-3
        shadow-sm
        transition-all
        duration-300
        ${accent.hoverBorder}
        ${accent.hoverGlow}
        hover:shadow-lg
      `}
    >
      <div className={`rounded-xl p-2 transition-colors duration-300 ${accent.iconBg}`}>
        <span className={accent.icon}>{icon}</span>
      </div>

      <div>
        <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
          {title}
        </p>
        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}