"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateEmailRecipientInput,
  CreateEmailRecipientSchema,
} from "@/validations/email-recipient.validation";

import {
  createEmailRecipientAction,
  updateEmailRecipientAction,
} from "@/actions/email-recipient.action";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  recipientId?: number;
  defaultValues?: Partial<CreateEmailRecipientInput>;
  onSuccess?: () => void;
}

export function EmailRecipientForm({
  recipientId,
  defaultValues,
  onSuccess,
}: Props) {
  const router = useRouter();

  const form =
    useForm<CreateEmailRecipientInput>({
      resolver: zodResolver(
        CreateEmailRecipientSchema,
      ),

      defaultValues: {
        name:
          defaultValues?.name ?? "",

        email:
          defaultValues?.email ?? "",

        consecutiveThreshold:
          defaultValues?.consecutiveThreshold ??
          3,
      },
    });

  const onSubmit = async (
    values: CreateEmailRecipientInput,
  ) => {
    const result = recipientId
      ? await updateEmailRecipientAction({
          id: recipientId,
          ...values,
        })
      : await createEmailRecipientAction(
          values,
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

    form.reset();

    router.refresh();

    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmit,
        )}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({
            field,
          }) => (
            <FormItem>
              <FormLabel>
                Name{" "}
                <span className="text-red-500">
                  *
                </span>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="DevOps Team"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({
            field,
          }) => (
            <FormItem>
              <FormLabel>
                Email Address{" "}
                <span className="text-red-500">
                  *
                </span>
              </FormLabel>

              <FormControl>
                <Input
                  type="email"
                  placeholder="team@example.com"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consecutiveThreshold"
          render={({
            field,
          }) => (
            <FormItem>
              <FormLabel>
                Consecutive Threshold{" "}
                <span className="text-red-500">
                  *
                </span>
              </FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="3"
                  value={
                    field.value
                  }
                  onChange={(
                    e,
                  ) =>
                    field.onChange(
                      Number(
                        e.target
                          .value,
                      ),
                    )
                  }
                />
              </FormControl>

              <p className="text-xs text-muted-foreground">
                Email will be sent
                after this many
                consecutive monitor
                status checks.
              </p>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={
            form.formState
              .isSubmitting
          }
        >
          {form.formState
            .isSubmitting
            ? recipientId
              ? "Updating..."
              : "Creating..."
            : recipientId
              ? "Update Recipient"
              : "Create Recipient"}
        </Button>
      </form>
    </Form>
  );
}