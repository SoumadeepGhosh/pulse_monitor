import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldValues, FieldPath } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const PasswordInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  isRequired,
  className,
  disabled,
}: PasswordInputProps<T>) => {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel className="text-black text-sm font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            <div className="relative flex items-center w-full">
              <Input
                {...field}
                type={show ? "text" : "password"}
                autoComplete="current-password"
                disabled={disabled}
                placeholder={placeholder}
                className="pr-10 w-full text-black"
              />

              <button
                type="button"
                onClick={() => setShow((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
