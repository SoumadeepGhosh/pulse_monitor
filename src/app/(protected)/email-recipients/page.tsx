import { auth } from "@/lib/auth";

import { getAllEmailRecipients } from "@/services/email-recipient.service";

import { Button } from "@/components/ui/button";

import { CreateEmailRecipientDialog } from "@/components/email-recipients/create-email-recipient-dialog";
import { EmailRecipientTable } from "@/components/email-recipients/email-recipient-table";

export default async function EmailRecipientPage() {
  const session = await auth();

  const result =
    await getAllEmailRecipients(
      Number(session?.user.id),
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Email Recipients
          </h1>

          <p className="text-muted-foreground">
            Manage reusable email recipients
          </p>
        </div>

        <CreateEmailRecipientDialog>
          <Button>
            Create Recipient
          </Button>
        </CreateEmailRecipientDialog>
      </div>

      <EmailRecipientTable
        recipients={result.data ?? []}
      />
    </div>
  );
}