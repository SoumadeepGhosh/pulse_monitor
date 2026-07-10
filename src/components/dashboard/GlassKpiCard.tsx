"use client";

import { motion } from "framer-motion";

import { ACCENT_STYLES } from "@/components/shared/accentStyles";
import { KpiItem } from "@/types/types";

interface GlassKpiCardProps {
  item: KpiItem;
  /** Index in the parent list, used to stagger the entrance animation */
  index?: number;
}

export function GlassKpiCard({ item, index = 0 }: GlassKpiCardProps) {
  const Icon = item.icon;
  const style = ACCENT_STYLES[item.accent];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      whileHover={{
        y: -3,
      }}
      className={`
        group
        relative
        flex
        h-full
        min-h-[132px]
        flex-col
        justify-between
        gap-4
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        dark:border-white/[0.06]
        bg-background/50
        dark:bg-white/[0.02]
        backdrop-blur-xl
        p-4
        transition-all
        duration-300
        ${style.border}
        ${style.shadow}
      `}
    >
      {/* Liquid shine sweep on hover */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/[0.06]
          to-transparent
          transition-transform
          duration-700
          ease-out
          group-hover:translate-x-full
        "
      />

      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 backdrop-blur-xl"
        style={{
          background: style.iconBg,
        }}
      >
        <Icon
          className="h-5 w-5"
          style={{
            color: style.iconColor,
          }}
        />
      </div>

      <div className="relative space-y-1.5">
        <p
          className="text-xs font-medium uppercase leading-snug tracking-wide"
          style={{
            color: "var(--text-tertiary)",
          }}
        >
          {item.label}
        </p>

        <h3
          className="text-xl font-bold leading-tight tracking-tight"
          style={{
            color: "var(--text-primary)",
          }}
        >
          {item.value}
        </h3>
      </div>
    </motion.div>
  );
}