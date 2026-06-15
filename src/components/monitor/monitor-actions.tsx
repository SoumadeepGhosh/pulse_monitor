"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { MoreHorizontal } from "lucide-react";

import { deleteMonitorAction } from "@/actions/monitor.action";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  monitorId: number;
  isActive: boolean;
}

export function MonitorActions({
  monitorId,
  isActive,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this monitor?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result =
        await deleteMonitorAction(
          monitorId
        );

      if (
        result.status === "success"
      ) {
        router.refresh();
      }
    });
  };

  const handleToggle = () => {
    console.log(
      `Monitor ${monitorId} ${
        isActive
          ? "Deactivate"
          : "Activate"
      }`
    );

    /**
     * Future:
     *
     * await toggleMonitorAction(
     *   monitorId
     * );
     *
     * router.refresh();
     */
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <Button
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
      >
        <DropdownMenuItem
          onClick={
            handleToggle
          }
        >
          {isActive
            ? "Deactivate"
            : "Activate"}
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
        >
          <Link
            href={`/monitor/${monitorId}`}
          >
            View Details
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={
            handleDelete
          }
          disabled={isPending}
          className="text-red-600"
        >
          {isPending
            ? "Deleting..."
            : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}