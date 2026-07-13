"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Ellipsis,
  Trash2,
} from "lucide-react";

import { toast } from "sonner";

import { deleteEmailRecipientAction } from "@/actions/email-recipient.action";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { UpdateEmailRecipientDialog } from "./update-email-recipient-dialog";
import { EmailRecipientType } from "@/types/email-recipient.type";

interface Props {
  recipient: EmailRecipientType;
}

export function EmailRecipientActions({
  recipient,
}: Props) {
  const router = useRouter();

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const handleDelete =
    async () => {
      try {
        setIsDeleting(true);

        const result =
          await deleteEmailRecipientAction(
            recipient.id,
          );

        if (
          result.status === "error"
        ) {
          toast.error(
            result.message,
          );

          return;
        }

        toast.success(
          result.message,
        );

        router.refresh();

        setDeleteDialogOpen(
          false,
        );
      } catch {
        toast.error(
          "Failed to delete email recipient",
        );
      } finally {
        setIsDeleting(false);
      }
    };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56"
        >
          <UpdateEmailRecipientDialog
            recipient={recipient}
          />

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() =>
              setDeleteDialogOpen(
                true,
              )
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />

            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={
          deleteDialogOpen
        }
        onOpenChange={
          setDeleteDialogOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Email
              Recipient
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot
              be undone.

              <br />
              <br />

              An email recipient
              can only be deleted
              when it is not
              assigned to any
              monitor.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={
                handleDelete
              }
              disabled={
                isDeleting
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting
                ? "Deleting..."
                : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}