import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "./text";

export const Header = ({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) => (
  <SafeAreaView edges={["top"]}>
    <View className="flex-row items-center justify-between px-base py-sm">
      <View className="w-8">
        {onBack && (
          <TouchableOpacity onPress={onBack}>
            <MaterialIcons name="arrow-back-ios" size={24} />
          </TouchableOpacity>
        )}
      </View>

      <AppText size="base" weight="bold">
        {title}
      </AppText>

      <View className="w-8 items-end">{right}</View>
    </View>
  </SafeAreaView>
);
