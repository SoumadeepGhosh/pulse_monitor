import { Card } from "@/components/ui/card";

interface Props {
  fastestResponse: number;
  averageResponse: number;
  slowestResponse: number;
  latestResponse: number;
}

export function ResponseMetricsCard({
  fastestResponse,
  averageResponse,
  slowestResponse,
  latestResponse,
}: Props) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Response Metrics
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Fastest Response
          </p>

          <p className="text-xl font-semibold">
            {fastestResponse}ms
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Average Response
          </p>

          <p className="text-xl font-semibold">
            {averageResponse}ms
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Slowest Response
          </p>

          <p className="text-xl font-semibold">
            {slowestResponse}ms
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Latest Response
          </p>

          <p className="text-xl font-semibold">
            {latestResponse}ms
          </p>
        </div>
      </div>
    </Card>
  );
}