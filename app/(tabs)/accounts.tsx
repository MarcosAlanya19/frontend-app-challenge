import { AppText } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CuentasScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <AppText color="gray-40">Cuentas</AppText>
      </View>
    </SafeAreaView>
  );
}
