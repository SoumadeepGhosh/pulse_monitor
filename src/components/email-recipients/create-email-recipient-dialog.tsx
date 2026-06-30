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

import { EmailRecipientForm } from "./email-recipient-form";

interface Props {
  children: React.ReactNode;
}

export function CreateEmailRecipientDialog({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-xl"
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Email Recipient</DialogTitle>

          <DialogDescription>
            Create a reusable email recipient.
          </DialogDescription>
        </DialogHeader>

        <EmailRecipientForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
