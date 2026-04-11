import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { cn } from "@/lib/cn";

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
}

export function Checkbox({ checked, onPress, label }: CheckboxProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-2">
      <View
        className={cn("w-5 h-5 rounded items-center justify-center border", {
          "bg-secondary border-secondary": checked,
          "bg-white border-gray-25": !checked,
        })}
      >
        {checked && (
          <Ionicons name="checkmark" size={14} color={Colors.white} />
        )}
      </View>
      {label && (
        <Text className="font-regular text-base text-secondary">{label}</Text>
      )}
    </Pressable>
  );
}
