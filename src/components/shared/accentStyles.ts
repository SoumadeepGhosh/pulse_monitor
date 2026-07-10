export type AccentColor = "blue" | "emerald" | "amber" | "violet" | "rose";

interface AccentStyle {
  /** CSS background for the icon badge */
  iconBg: string;
  /** CSS color for the icon itself (can reference a design-system var) */
  iconColor: string;
  /** Raw hex, used for gradients / glows that can't consume CSS vars */
  hex: string;
  /** Tailwind hover border utility */
  border: string;
  /** Tailwind hover shadow utility */
  shadow: string;
}

export const ACCENT_STYLES: Record<AccentColor, AccentStyle> = {
  blue: {
    iconBg: "rgba(59,130,246,.10)",
    iconColor: "var(--accent-primary)",
    hex: "#3b82f6",
    border: "hover:border-blue-400/30",
    shadow: "hover:shadow-blue-500/10",
  },
  emerald: {
    iconBg: "rgba(34,197,94,.12)",
    iconColor: "var(--status-healthy)",
    hex: "#22c55e",
    border: "hover:border-emerald-400/30",
    shadow: "hover:shadow-emerald-500/10",
  },
  amber: {
    iconBg: "rgba(245,158,11,.12)",
    iconColor: "var(--status-warning)",
    hex: "#f59e0b",
    border: "hover:border-amber-400/30",
    shadow: "hover:shadow-amber-500/10",
  },
  violet: {
    iconBg: "rgba(139,92,246,.12)",
    iconColor: "#a78bfa",
    hex: "#8b5cf6",
    border: "hover:border-violet-400/30",
    shadow: "hover:shadow-violet-500/10",
  },
  rose: {
    iconBg: "rgba(244,63,94,.12)",
    iconColor: "var(--status-critical)",
    hex: "#f43f5e",
    border: "hover:border-rose-400/30",
    shadow: "hover:shadow-rose-500/10",
  },
};