import { AppText } from "@/components/ui/text";
import { formatKoins } from "@/lib/currency";
import { View } from "react-native";

interface SavingsRowProps {
  savings: string;
  koins: number;
}

export function SavingsRow({ savings, koins }: SavingsRowProps) {
  return (
    <View className="flex-row justify-between px-base pt-base">
      <View>
        <AppText size="base" weight="medium" color="secondary">
          Ahorro estimado:
        </AppText>
        <AppText size="base" color="secondary" weight="semibold">
          S/ {savings}
        </AppText>
      </View>

      <View className="items-end">
        <AppText size="base" weight="medium" color="secondary">
          Koins
        </AppText>
        <AppText size="base" color="secondary" weight="semibold">
          {formatKoins(koins)}
        </AppText>
      </View>
    </View>
  );
}
