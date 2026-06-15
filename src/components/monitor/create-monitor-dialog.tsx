"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateMonitorForm } from "./create-monitor-form";

interface Props {
  children: React.ReactNode;
}

export function CreateMonitorDialog({
  children,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Create Monitor
          </DialogTitle>

          <DialogDescription>
            Add a new API or website to monitor.
          </DialogDescription>
        </DialogHeader>

        <CreateMonitorForm />
      </DialogContent>
    </Dialog>
  );
}