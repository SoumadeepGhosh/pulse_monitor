"use client";

import { useState } from "react";

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
  const [open, setOpen] =
    useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
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

        <CreateMonitorForm
          onSuccess={() =>
            setOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}