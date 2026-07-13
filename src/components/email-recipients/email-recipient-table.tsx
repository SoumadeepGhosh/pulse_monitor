import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { EmailRecipientActions } from "./email-recipient-actions";
import { EmailRecipientType } from "@/types/email-recipient.type";

interface Props {
  recipients: EmailRecipientType[];
}

export function EmailRecipientTable({ recipients }: Props) {
  if (!recipients.length) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border bg-card">
        <p className="text-sm text-muted-foreground">
          No email recipients found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>Email Address</TableHead>

            <TableHead>Threshold</TableHead>

            <TableHead className="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {recipients.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>

              <TableCell>{item.email}</TableCell>

              <TableCell>{item.consecutiveThreshold}</TableCell>

              <TableCell className="text-right">
                <EmailRecipientActions recipient={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
