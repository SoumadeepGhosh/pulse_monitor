"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EmailInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
}

const EmailInput = <T extends FieldValues>({
  control,
  name,
  label,
  isRequired,
  placeholder,
}: EmailInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-black text-sm font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            <Input {...field} type="email" placeholder={placeholder} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
