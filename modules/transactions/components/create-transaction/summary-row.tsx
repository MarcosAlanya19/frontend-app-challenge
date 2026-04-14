import { AppText } from "@/components/ui/text";
import { View } from "react-native";

interface IProps {
  label: string;
  value: string;
}

export const SummaryRow = ({ label, value }: IProps) => {
  return (
    <View className="flex-row justify-between items-center py-xs">
      <AppText size="base" color="secondary">
        {label}
      </AppText>
      <AppText size="base" weight="bold" color="secondary">
        {value}
      </AppText>
    </View>
  );
};
