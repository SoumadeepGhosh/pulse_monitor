"use client";

import { DashboardFilter, DashboardOverview } from "@/types/dashboard.type";
import { DashboardPolling } from "./DashboardPolling";
import { DashboardHeader } from "./header/DashboardHeader";
import { MonitorStatusChart } from "./MonitorStatusChart";
import { RecentMonitorChecks } from "./RecentMonitorChecks";
import { CurrentUser } from "@/types/user.type";
import { SuccessCriteriaCard } from "./success-criteria/SuccessCriteriaCard";
import { EmailNotificationCard } from "./email-notification/EmailNotificationCard";
import { useState } from "react";
import { NotificationSheet } from "../notifications/notification-sheet";

interface DashboardProps {
  dashboard: DashboardOverview;
  user: CurrentUser | null;
  filter: DashboardFilter;
}

export function Dashboard({ dashboard, user, filter }: DashboardProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  return (
    <>
      <DashboardPolling interval={30000} />
      <NotificationSheet
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
      />

      <main className="space-y-8 p-6 md:p-8">
<DashboardHeader
  overview={dashboard}
  userName={user?.name ?? "User"}
  workspaceName="Personal Workspace"
  filter={filter}
  onViewAlerts={() => setNotificationOpen(true)}
/>
        <section className="mt-6 grid items-stretch gap-6 xl:grid-cols-2">
          <MonitorStatusChart overview={dashboard} />
          <RecentMonitorChecks checks={dashboard.recentChecks} />
        </section>
        <section className="grid items-stretch gap-6 xl:grid-cols-2">
          <SuccessCriteriaCard data={dashboard.successCriteria} />

          <EmailNotificationCard data={dashboard.emailNotifications} />
        </section>
      </main>
    </>
  );
}
