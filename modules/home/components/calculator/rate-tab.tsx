import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { ActivityIndicator, Pressable } from "react-native";

interface RateTabProps {
  label: string;
  rate: number;
  active: boolean;
  isLoading: boolean;
  onPress: () => void;
}

export function RateTab({
  label,
  rate,
  active,
  isLoading,
  onPress,
}: RateTabProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-1/2 rounded-tl-md rounded-tr-md py-md items-center justify-center"
      style={active ? { backgroundColor: Colors.secondary } : undefined}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={active ? Colors.white : Colors.gray40}
        />
      ) : (
        <AppText size="base" weight="bold" color={active ? "white" : "gray-60"}>
          {label}: {rate.toFixed(3)}
        </AppText>
      )}
    </Pressable>
  );
}
