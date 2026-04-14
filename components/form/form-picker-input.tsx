import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { AppText } from "@/components/ui/text";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@/components/ui/picker";
import { Colors } from "@/constants/theme";
import { cn } from "@/lib/cn";

interface PickerOption {
  label: string;
  value: string;
}

interface FormPickerInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: PickerOption[];
  containerClassName?: string;
}

export function FormPickerInput({
  name,
  label,
  placeholder,
  options,
  containerClassName,
}: FormPickerInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  const [visible, setVisible] = useState(false);
  const [tempValue, setTempValue] = useState(field.value || "");

  const selectedLabel = options.find((o) => o.value === field.value)?.label;

  const handleOpen = () => {
    setTempValue(field.value || options[0]?.value || "");
    setVisible(true);
  };

  const handleAccept = () => {
    field.onChange(tempValue);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <View className={cn("gap-1", containerClassName)}>
      {label && (
        <AppText size="sm" color="gray-60">
          {label}
        </AppText>
      )}
      <TouchableOpacity
        onPress={handleOpen}
        activeOpacity={0.8}
        className={cn(
          "flex-row items-center h-4xl px-5 rounded-lg border bg-white",
          {
            "border-red": !!fieldState.error,
            "border-gray-25": !fieldState.error,
          },
        )}
      >
        <View className="flex-1">
          <AppText
            weight="regular"
            size="base"
            color={selectedLabel ? "secondary" : "gray-40"}
          >
            {selectedLabel || placeholder || ""}
          </AppText>
        </View>
        <Ionicons name="chevron-down" size={20} color={Colors.gray40} />
      </TouchableOpacity>
      {fieldState.error && (
        <AppText size="sm" color="red">
          {fieldState.error.message}
        </AppText>
      )}
      <Picker
        visible={visible}
        options={options}
        selectedValue={tempValue}
        onValueChange={setTempValue}
        onAccept={handleAccept}
        onCancel={handleCancel}
      />
    </View>
  );
}
