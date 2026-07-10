"use server";

import { auth } from "@/lib/auth";

import {
  createErrorResponse,
  createSuccessResponse,
  AppResponseWrapper,
} from "@/types/common.type";

import { DashboardFilter, DashboardOverview } from "@/types/dashboard.type";
import { CurrentUser } from "@/types/user.type";

import { getDashboardData } from "@/services/dashboard.service";
import { getCurrentUser } from "@/services/user.service";

interface DashboardActionResponse {
  dashboard: DashboardOverview;
  user: CurrentUser | null;
}

export async function getDashboardDataAction(
  filter: DashboardFilter = "ALL",
): Promise<AppResponseWrapper<DashboardActionResponse>> {
  const session = await auth();

  if (!session?.user?.id) {
    return createErrorResponse("Unauthorized");
  }

  const userId = Number(session.user.id);

  const [dashboard, currentUser] = await Promise.all([
    getDashboardData(userId, filter),
    getCurrentUser(),
  ]);

  if (dashboard.status === "error") {
    return createErrorResponse(dashboard.message);
  }

  return createSuccessResponse("Dashboard loaded successfully", {
    dashboard: dashboard.data!,
    user: currentUser.data,
  });
}