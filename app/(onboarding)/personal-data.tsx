import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { PersonalDataForm } from "@/modules/onboarding/components/personal-data-form";
import {
  PersonalDataFormData,
  personalDataSchema,
} from "@/modules/onboarding/components/personal-data-form/index.schema";
import { useRegister } from "@/modules/onboarding/hooks/use-register";
import { useAuthStore } from "@/stores/use-auth-store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PersonalDataScreen() {
  const methods = useForm<PersonalDataFormData>({
    resolver: zodResolver(personalDataSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      documentType: "",
      documentNumber: "",
      phone: "",
      birthDate: "",
      previousExchange: "",
      termsAccepted: false,
      privacyAccepted: false,
    },
  });

  const { handle } = useRegister();

  const onSubmit = methods.handleSubmit(async (data: PersonalDataFormData) => {
    const email = await handle({ payload: data });
    if (!email) return;

    useAuthStore.getState().setCurrentUser({
      email,
      fullName: data.fullName,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      phone: data.phone,
      birthDate: data.birthDate,
    });

    router.push({
      pathname: "/(onboarding)/success",
      params: { name: data.fullName.split(" ")[0], email },
    });
  });

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
      <PersonalDataForm methods={methods} onSubmit={onSubmit} />
    </SafeAreaView>
  );
}
