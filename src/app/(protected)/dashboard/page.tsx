import { getDashboardDataAction } from "@/actions/dashboard.action";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DashboardPolling } from "@/components/dashboard/DashboardPolling";
import { DashboardFilter } from "@/types/dashboard.type";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    filter?: DashboardFilter;
  }>;
}) {
  const { filter = "ALL" } = await searchParams;

  const result = await getDashboardDataAction(filter);

  if (result.status === "error" || !result.data) {
    return <div>{result.message}</div>;
  }

  return (
    <>
      <DashboardPolling interval={30000} />

      <Dashboard
        dashboard={result.data.dashboard}
        user={result.data.user}
        filter={filter}
      />
    </>
  );
}