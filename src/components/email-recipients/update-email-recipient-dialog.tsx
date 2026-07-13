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

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Pencil } from "lucide-react";

import { EmailRecipientForm } from "./email-recipient-form";
import { EmailRecipientType } from "@/types/email-recipient.type";

interface Props {
  recipient: EmailRecipientType;
}

export function UpdateEmailRecipientDialog({
  recipient,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            setOpen(true)
          }
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-xl"
        onInteractOutside={(e) =>
          e.preventDefault()
        }
        onPointerDownOutside={(e) =>
          e.preventDefault()
        }
        onFocusOutside={(e) =>
          e.preventDefault()
        }
      >
        <DialogHeader>
          <DialogTitle>
            Update Email Recipient
          </DialogTitle>

          <DialogDescription>
            Update the recipient
            information and
            consecutive threshold.
          </DialogDescription>
        </DialogHeader>

        <EmailRecipientForm
          recipientId={recipient.id}
          defaultValues={{
            name: recipient.name,
            email: recipient.email,
            consecutiveThreshold:
              recipient.consecutiveThreshold,
          }}
          onSuccess={() =>
            setOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}