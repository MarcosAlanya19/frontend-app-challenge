import { Checkbox, type CheckboxProps } from "@/components/ui/checkbox";
import { AppText } from "@/components/ui/text";
import { type ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Pressable, View } from "react-native";

interface IProps extends Omit<CheckboxProps, "checked" | "onPress" | "label"> {
  name: string;
  label?: string;
  children?: ReactNode;
}

export function FormCheckbox({ name, label, children, ...props }: IProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  const toggle = () => field.onChange(!field.value);

  const content = label ? (
    <AppText size="sm">{label}</AppText>
  ) : (
    (children ?? null)
  );

  const checkbox = (
    <Checkbox checked={field.value ?? false} onPress={toggle} {...props} />
  );

  return (
    <View className="gap-1 ">
      {content ? (
        <Pressable onPress={toggle}>
          <View className="flex-row items-center gap-2">
            {checkbox}
            <View style={{ flex: 1 }}>{content}</View>
          </View>
        </Pressable>
      ) : (
        checkbox
      )}
      {fieldState.error && (
        <AppText size="sm" color="red">
          {fieldState.error.message}
        </AppText>
      )}
    </View>
  );
}
