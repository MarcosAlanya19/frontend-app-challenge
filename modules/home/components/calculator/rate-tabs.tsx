import { ERateType } from "@/enums/rate-type";
import { View } from "react-native";
import { RateTab } from "./rate-tab";

interface RateTabsProps {
  buyRate: number;
  sellRate: number;
  isLoading: boolean;
  rateType: ERateType;
  onRateTypeChange: (type: ERateType) => void;
}

export function RateTabs({
  buyRate,
  sellRate,
  isLoading,
  rateType,
  onRateTypeChange,
}: RateTabsProps) {
  return (
    <View className="flex-row">
      <RateTab
        label="Compra"
        rate={buyRate}
        active={rateType === ERateType.BUY}
        isLoading={isLoading}
        onPress={() => onRateTypeChange(ERateType.BUY)}
      />
      <RateTab
        label="Venta"
        rate={sellRate}
        active={rateType === ERateType.SELL}
        isLoading={isLoading}
        onPress={() => onRateTypeChange(ERateType.SELL)}
      />
    </View>
  );
}
