import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "@/components/ui/text";
import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/theme";
import { PersonalDataForm } from "@/modules/onboarding/components/personal-data-form";

export default function PersonalDataScreen() {
  const handleBack = () => router.back();
  const handleExit = () => router.replace("/(auth)");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-base py-sm  border-gray-25">
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={Colors.secondary}
          />
        </TouchableOpacity>
        <AppText size="base" weight="bold">
          Completa tus datos
        </AppText>
        <TouchableOpacity onPress={handleExit}>
          <MaterialIcons name="logout" size={24} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
      <PersonalDataForm />
    </SafeAreaView>
  );
}
