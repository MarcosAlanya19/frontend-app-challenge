import { View } from "react-native";
import { AppText } from "@/components/ui/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
    <View
      className={cn("flex-row gap-3 p-3 rounded-xl items-center", container)}
    >
      <MaterialIcons name="info-outline" size={20} color={iconColor} />
      <View className="flex-1">
        <AppText size="sm" weight="medium">
          {message}
        </AppText>
      </View>
    </View>
  );
}
