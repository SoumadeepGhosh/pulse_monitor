import { LucideIcon } from "lucide-react";

import { AccentColor } from "@/components/shared/accentStyles";

export interface KpiItem {
  id: string;
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent: AccentColor;
}

export interface DistributionItem {
  id: string;
  label: string;
  percentage: number;
  accent: AccentColor;
}