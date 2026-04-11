import { useController, useFormContext } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/input";

interface FormInputProps extends Omit<InputProps, "value" | "onChangeText" | "onBlur" | "error"> {
  name: string;
}

export function FormInput({ name, ...props }: FormInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  return (
    <Input
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
      {...props}
    />
  );
}
