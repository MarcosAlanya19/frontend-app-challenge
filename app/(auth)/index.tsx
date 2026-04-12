import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogoSVG } from "@/components/icons/logo-svg";
import { LoginForm } from "@/modules/auth/components/login-form";
import { AppText } from "@/components/ui/text";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1  px-xl pt-24 pb-16">
          <View className="items-center gap-xl mb-5xl">
            <LogoSVG />
            <AppText size="xl" weight="bold">
              Inicia sesión
            </AppText>
          </View>
          <LoginForm />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
