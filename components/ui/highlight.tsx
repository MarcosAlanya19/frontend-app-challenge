import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { cn } from "@/lib/cn";

type HighlightVariant = "info" | "warning";

interface HighlightProps {
  message: string;
  variant?: HighlightVariant;
}

const variantConfig: Record<
  HighlightVariant,
  { container: string; iconColor: string }
> = {
  info: {
    container: "bg-blue-ultra-light",
    iconColor: Colors.blue,
  },
  warning: {
    container: "bg-red-lighter",
    iconColor: "#92400E",
  },
};

export function Highlight({ message, variant = "info" }: HighlightProps) {
  const { container, iconColor } = variantConfig[variant];

  return (
    <View className={cn("flex-row gap-3 p-3 rounded-xl", container)}>
      <Ionicons
        name="information-circle-outline"
        size={20}
        color={iconColor}
        style={{ marginTop: 1 }}
      />
      <Text className="flex-1 font-regular text-sm text-secondary leading-5">
        {message}
      </Text>
    </View>
  );
}
