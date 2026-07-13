"use client";

import { motion } from "framer-motion";
import { ACCENT_STYLES, type AccentColor } from "@/lib/dashboard-accent-styles";

interface StatBoxProps {
  label: string;
  value: string;
  color: AccentColor;
}

export function StatBox({ label, value, color }: StatBoxProps) {
  const accent = ACCENT_STYLES[color];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`
        rounded-2xl
        border
        ${accent.border}
bg-background/60
dark:bg-card/60
        backdrop-blur-xl
        p-4
        transition-all
        duration-300
        ${accent.hoverBorder}
      `}
    >
      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
        {label}
      </p>
      <p className="mt-2 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
        {value}
      </p>
    </motion.div>
  );
}