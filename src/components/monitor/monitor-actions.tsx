"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MoreHorizontal, Eye, Trash2, Play, Pause } from "lucide-react";

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

export function MonitorActions({ monitorId, isActive }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this monitor?",
    );

    if (!confirmed) return;

    const result = await deleteMonitorAction(monitorId);

    if (result.status === "success") {
      router.refresh();
    }
  };

  const handleToggle = async () => {
    console.log(`Monitor ${monitorId} ${isActive ? "Deactivate" : "Activate"}`);

    /**
     * await toggleMonitorAction(
     *   monitorId
     * );
     *
     * router.refresh();
     */
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleToggle}>
          {isActive ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Deactivate
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Activate
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/monitor/${monitorId}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
