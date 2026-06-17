import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { CheckResult } from "../../../../generated/prisma/client";

interface Props {
  checkResults: CheckResult[];
}

export function RecentChecksTimeline({
  checkResults,
}: Props) {
  const recentChecks =
    checkResults.slice(0, 15);

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">
            Recent Checks
          </h2>

          <p className="text-xs text-muted-foreground">
            Latest monitoring results
          </p>
        </div>

        <div className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
          {recentChecks.length}
        </div>
      </div>

      <div
        className="
          h-[350px]
          overflow-y-auto
          pr-1
          space-y-2

          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-border
          hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40
        "
      >
        {recentChecks.map(
          (result) => (
            <div
              key={result.id}
              className="
                flex items-center justify-between
                rounded-lg
                border
                px-3
                py-2
                transition-all
                hover:bg-muted/40
              "
            >
              <div className="flex items-center gap-2">
                {result.success ? (
                  <div className="rounded-full bg-emerald-500/10 p-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                ) : (
                  <div className="rounded-full bg-red-500/10 p-1">
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                  </div>
                )}

                <div>
                  <p className="text-xs font-semibold">
                    {result.statusCode ??
                      "-"}
                  </p>

                  <p className="text-[11px] text-muted-foreground">
                    {new Date(
                      result.checkedAt,
                    ).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute:
                          "2-digit",
                      },
                    )}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`text-xs font-bold ${
                    result.success
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {result.responseTime ??
                    "-"}
                  ms
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}