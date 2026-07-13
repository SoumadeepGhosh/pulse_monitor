"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface DashboardPollingProps {
  interval?: number;
}

export function DashboardPolling({
  interval = 30000,
}: DashboardPollingProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      router.refresh();
    }, interval);

    return () => clearInterval(timer);
  }, [router, interval]);

  return null;
}