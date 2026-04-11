import { useController, useFormContext } from "react-hook-form";
import { Checkbox, CheckboxProps } from "@/components/ui/checkbox";

interface FormCheckboxProps extends Omit<CheckboxProps, "checked" | "onPress"> {
  name: string;
}

export function FormCheckbox({ name, ...props }: FormCheckboxProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <Checkbox
      checked={field.value ?? false}
      onPress={() => field.onChange(!field.value)}
      {...props}
    />
  );
}
