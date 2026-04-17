import {
  FieldValues,
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import { ISelectOption, Select } from "../ui/select";

interface FormSelectProps<T extends FieldValues> extends Omit<
  UseControllerProps<T>,
  "control"
> {
  label: string;
  sheetTitle: string;
  options: ISelectOption[];
  placeholder?: string;
  footer?:
    | React.ReactNode
    | ((helpers: { close: () => void }) => React.ReactNode);
}

export function FormSelect<T extends FieldValues>({
  name,
  rules,
  label,
  sheetTitle,
  options,
  placeholder,
  footer,
}: FormSelectProps<T>) {
  const { control } = useFormContext<T>();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: "Este campo es requerido", ...rules },
  });

  return (
    <Select
      label={label}
      sheetTitle={sheetTitle}
      options={options}
      value={value}
      onSelect={onChange}
      placeholder={placeholder}
      footer={footer}
      error={error?.message}
    />
  );
}
