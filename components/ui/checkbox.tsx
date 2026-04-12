import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { cn } from "@/lib/cn";
import Entypo from "@expo/vector-icons/Entypo";
import { Pressable, View } from "react-native";

export interface CheckboxProps {
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
        {checked && <Entypo name="check" size={14} color={Colors.white} />}
      </View>
      {label && <AppText weight="regular">{label}</AppText>}
    </Pressable>
  );
}
