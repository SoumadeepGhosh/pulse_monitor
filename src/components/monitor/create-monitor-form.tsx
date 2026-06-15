"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateMonitorInput,
  CreateMonitorSchema,
} from "@/validations/monitor.validation";

import { createMonitorAction } from "@/actions/monitor.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSuccess?: () => void;
}

export function CreateMonitorForm({ onSuccess }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm<CreateMonitorInput>({
    resolver: zodResolver(CreateMonitorSchema),
    defaultValues: {
      method: "GET",
      intervalMinutes: 5,
    },
  });

  const onSubmit = (values: CreateMonitorInput) => {
    startTransition(async () => {
      const result = await createMonitorAction({
        ...values,
        method: "GET",
      });

      console.log("Create Result:", result);

      if (result.status === "success") {
        reset();

        router.refresh();

        onSuccess?.();
      }

      console.log(result);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Monitor Name</label>

        <Input placeholder="Backend Health API" {...register("name")} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">URL</label>

        <Input
          placeholder="https://api.example.com/health"
          {...register("url")}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Check Interval (Minutes)</label>

        <Input
          type="number"
          min={1}
          {...register("intervalMinutes", {
            valueAsNumber: true,
          })}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Monitor"}
      </Button>
    </form>
  );
}
