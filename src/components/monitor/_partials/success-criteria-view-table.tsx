"use client";

import { Braces, Clock3, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SuccessCriteriaType } from "@/types/success-criteria.type";

interface Props {
  criteria: SuccessCriteriaType[];
}

const styles = {
  STATUS_CODE: {
    Icon: ShieldCheck,
    label: "HTTP Status",
    icon: "text-emerald-600",
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  },

  RESPONSE_TIME: {
    Icon: Clock3,
    label: "Response Time",
    icon: "text-blue-600",
    badge:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  },

  RESPONSE_BODY: {
    Icon: Braces,
    label: "Response Body",
    icon: "text-violet-600",
    badge:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300",
  },
} as const;

export function SuccessCriteriaTable({ criteria }: Props) {
  return (
    <section className="overflow-hidden rounded-xl border bg-card">
      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold">Success Criteria</h2>

          <p className="text-sm text-muted-foreground">
            Rules used to determine monitor health.
          </p>
        </div>

        <Badge variant="secondary" className="rounded-full px-4 py-1">
          {criteria.length} Rules Configured
        </Badge>
      </div>

      {/* Table */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-55">Type</TableHead>

            <TableHead>Name</TableHead>

            <TableHead>Operator</TableHead>

            <TableHead>Expected Value</TableHead>

            <TableHead>JSON Path</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {criteria.map((item) => {
            const style = styles[item.type];
            const Icon = style.Icon;

            return (
              <TableRow key={item.id}>
                {/* Type */}

                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("gap-2 border font-medium", style.badge)}
                  >
                    <Icon className={cn("h-4 w-4", style.icon)} />

                    {style.label}
                  </Badge>
                </TableCell>

                {/* Name */}
                <TableCell className="max-w-65">
                  <span
                    className="block truncate font-medium"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                </TableCell>

                {/* Operator */}

                <TableCell>
                  <Badge variant="secondary">
                    {item.operator.replaceAll("_", " ")}
                  </Badge>
                </TableCell>

                {/* Expected */}

                <TableCell className="font-semibold">
                  {item.expectedValue}
                </TableCell>

                {/* JSON Path */}

                <TableCell>
                  {item.jsonPath ? (
                    <code className="rounded-md bg-muted px-2 py-1 text-xs">
                      {item.jsonPath}
                    </code>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
