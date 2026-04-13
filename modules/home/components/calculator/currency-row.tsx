import { AppText } from "@/components/ui/text";
import { Pressable, View } from "react-native";

interface CurrencyRowProps {
  label: string;
  currencyLabel: string;
  children: React.ReactNode;
  onCurrencyPress?: () => void;
}

export function CurrencyRow({
  label,
  currencyLabel,
  children,
  onCurrencyPress,
}: CurrencyRowProps) {
  return (
    <View
      className="flex-row rounded-md overflow-hidden bg-white"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <View className="flex-1 px-lg py-lg bg-gray-10">
        <AppText size="base" color="secondary" weight="medium">
          {label}
        </AppText>

        <View className="mt-sm">{children}</View>
      </View>

      <Pressable
        onPress={onCurrencyPress}
        className="bg-secondary px-lg items-center justify-center flex-row gap-xs"
        style={{ minWidth: 120 }}
      >
        <AppText size="md" weight="bold" color="white">
          {currencyLabel}
        </AppText>
      </Pressable>
    </View>
  );
}
