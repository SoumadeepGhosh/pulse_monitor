import { CheckResult } from "../../../../generated/prisma/client";

interface Props {
  checkResults: CheckResult[];
}

export function RecentChecksTimeline({ checkResults }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 h-full">
      <h2 className="mb-4 text-lg font-semibold">Recent Checks</h2>

      <div className="flex flex-col gap-2">
        {checkResults.slice(0, 25).map((result) => (
          <div
            key={result.id}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  result.success ? "bg-green-500" : "bg-red-500"
                }`}
              />

              <span>{result.statusCode ?? "-"}</span>
            </div>

            <span>{result.responseTime ?? "-"}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}
