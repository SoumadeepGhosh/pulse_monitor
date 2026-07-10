export type AccentColor = "blue" | "violet" | "emerald" | "amber";

interface AccentStyle {
  icon: string;
  iconBg: string;
  border: string;
  hoverBorder: string;
  hoverGlow: string;
}

export const ACCENT_STYLES: Record<AccentColor, AccentStyle> = {
  blue: {
    icon: "text-blue-500",
    iconBg: "bg-blue-500/10",
    border: "border-blue-500/10 dark:border-blue-400/[0.08]",
    hoverBorder: "hover:border-blue-500/30",
    hoverGlow: "hover:shadow-blue-500/10",
  },
  violet: {
    icon: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "border-violet-500/10 dark:border-violet-400/[0.08]",
    hoverBorder: "hover:border-violet-500/30",
    hoverGlow: "hover:shadow-violet-500/10",
  },
  emerald: {
    icon: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "border-emerald-500/10 dark:border-emerald-400/[0.08]",
    hoverBorder: "hover:border-emerald-500/30",
    hoverGlow: "hover:shadow-emerald-500/10",
  },
  amber: {
    icon: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "border-amber-500/10 dark:border-amber-400/[0.08]",
    hoverBorder: "hover:border-amber-500/30",
    hoverGlow: "hover:shadow-amber-500/10",
  },
};