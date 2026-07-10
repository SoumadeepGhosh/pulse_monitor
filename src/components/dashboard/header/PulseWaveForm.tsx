"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

import type { PlatformStatus } from "@/types/dashboard.type";

const STATUS_CSS_VAR: Record<PlatformStatus, string> = {
  operational: "--status-healthy",
  degraded: "--status-warning",
  critical: "--status-critical",
};

interface PulseWaveformProps {
  status: PlatformStatus;
  className?: string;
}

export function PulseWaveform({
  status,
  className,
}: PulseWaveformProps) {
  const gradientId = useId();

  const [strokeColor, setStrokeColor] = useState("#22c55e");

  useEffect(() => {
    const root = document.documentElement;

    const cssVar = STATUS_CSS_VAR[status];

    const value = getComputedStyle(root)
      .getPropertyValue(cssVar)
      .trim();

    if (value) {
      setStrokeColor(value);
    }
  }, [status]);

  const segment =
    "M0,40 L60,40 L75,40 L85,10 L100,70 L110,40 L130,40 L145,25 L155,55 L165,40 L400,40";

  return (
    <svg
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      className={className}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0" />

          <stop offset="15%" stopColor={strokeColor} stopOpacity="0.9" />

          <stop offset="85%" stopColor={strokeColor} stopOpacity="0.9" />

          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d={segment}
          animate={{ x: [0, -400] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.path
          d={segment}
          animate={{ x: [400, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </g>
    </svg>
  );
}