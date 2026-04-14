import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { cn } from "@/lib/cn";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactNode } from "react";
import { View } from "react-native";

type HighlightVariant = "info" | "warning";

interface HighlightProps {
  children: ReactNode;
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
    container: "bg-brown-light",
    iconColor: Colors.brown,
  },
};

export function Highlight({ children, variant = "info" }: HighlightProps) {
  const { container, iconColor } = variantConfig[variant];

  return (
    <View
      className={cn("flex-row gap-3 p-3 rounded-xl items-center", container)}
    >
      <MaterialIcons name="info-outline" size={20} color={iconColor} />

      <View className="flex-1">
        <AppText size="sm" weight="medium">
          {children}
        </AppText>
      </View>
    </View>
  );
}
