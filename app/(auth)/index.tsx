import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "@/components/icons/logo";
import { LoginForm } from "@/modules/auth/components/login-form";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 px-base pt-24 pb-16">
          <View className="items-center gap-xl mb-5xl">
            <Logo />
            <Text className="font-bold text-xl text-black">Inicia sesión</Text>
          </View>
          <LoginForm />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
