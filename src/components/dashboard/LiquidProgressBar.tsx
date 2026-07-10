"use client";

import { motion } from "framer-motion";

import { ACCENT_STYLES } from "@/components/shared/accentStyles";
import { DistributionItem } from "@/types/types";

interface LiquidProgressBarProps {
  item: DistributionItem;
  /** Index in the parent list, used to stagger the fill animation */
  index?: number;
}

export function LiquidProgressBar({
  item,
  index = 0,
}: LiquidProgressBarProps) {
  const style = ACCENT_STYLES[item.accent];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span
          style={{
            color: "var(--text-secondary)",
          }}
        >
          {item.label}
        </span>

        <span
          className="font-semibold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          {item.percentage}%
        </span>
      </div>

      <div
        className="
          h-2.5
          overflow-hidden
          rounded-full
          border
          border-white/10
          dark:border-white/[0.06]
          bg-white/[0.06]
          backdrop-blur-xl
        "
      >
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${item.percentage}%`,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: index * 0.1,
          }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${style.hex}, ${style.hex}cc)`,
            boxShadow: `0 0 12px ${style.hex}55`,
          }}
        />
      </div>
    </div>
  );
}