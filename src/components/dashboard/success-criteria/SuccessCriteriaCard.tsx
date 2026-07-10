"use client";

import { motion } from "framer-motion";

import { SuccessCriteriaDistribution } from "./SuccessCriteriaDistribution";
import { SuccessCriteriaFooter } from "./SuccessCriteriaFooter";
import { SuccessCriteriaHeader } from "./successCriteriaHeader";
import { SuccessCriteriaMetrics } from "./SuccessCriteriaMetrics";
import { SuccessCriteriaDashboard } from "@/types/dashboard.type";
import { Gauge, Link2, Shield, Unlink } from "lucide-react";

interface SuccessCriteriaCardProps {
  data: SuccessCriteriaDashboard;
}

export function SuccessCriteriaCard({ data }: SuccessCriteriaCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
  relative
  flex
  h-full
  min-h-[760px]
  flex-col
  overflow-hidden
  rounded-3xl
  border
  border-white/10
  dark:border-white/[0.06]
  bg-background/70
  dark:bg-card/40
  backdrop-blur-2xl
  shadow-[0_10px_40px_rgba(0,0,0,.06)]
  dark:shadow-[0_20px_60px_rgba(0,0,0,.35)]
"
    >
      {/* Ambient lighting layer */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-white/[0.05] blur-[100px]" />

      <SuccessCriteriaHeader coverage={data.coverage} />

      <div className="relative flex flex-1 flex-col gap-8 px-8 pb-12">
        <SuccessCriteriaMetrics
          kpis={[
            {
              id: "total-rules",
              label: "Total Rules",
              value: data.totalRules,
              icon: Shield,
              accent: "blue",
            },
            {
              id: "assigned",
              label: "Assigned",
              value: data.assignedRules,
              icon: Link2,
              accent: "emerald",
            },
            {
              id: "unassigned",
              label: "Unassigned",
              value: data.unassignedRules,
              icon: Unlink,
              accent: "amber",
            },
            {
              id: "most-used",
              label: "Most Used",
              value: data.mostUsedCriteriaName,
              icon: Gauge,
              accent: "violet",
            },
          ]}
        />

        <SuccessCriteriaDistribution
          distribution={[
            {
              id: "response-time",
              label: "Response Time",
              percentage: data.distribution.responseTime,
              accent: "blue",
            },
            {
              id: "status-code",
              label: "Status Code",
              percentage: data.distribution.statusCode,
              accent: "emerald",
            },
            {
              id: "response-body",
              label: "Response Body",
              percentage: data.distribution.responseBody,
              accent: "violet",
            },
          ]}
        />

        <div className="mt-auto pt-2">
          <SuccessCriteriaFooter
            protectedCount={data.protectedMonitors}
            unprotectedCount={data.unprotectedMonitors}
          />
        </div>

        <div className="h-2 shrink-0" aria-hidden="true" />
      </div>
    </motion.div>
  );
}
