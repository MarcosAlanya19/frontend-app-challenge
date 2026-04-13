import { LogoSVG } from "@/components/icons/logo-svg";
import { AppText } from "@/components/ui/text";
import { LoginForm } from "@/modules/auth/components/login-form";
import {
  ILoginFormData,
  loginSchema,
} from "@/modules/auth/components/login-form/index.schema";
import { useLogin } from "@/modules/auth/hooks/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const methods = useForm<ILoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { handle } = useLogin();

  const onSubmit = methods.handleSubmit(async (data: ILoginFormData) => {
    const success = await handle({ payload: data });
    if (success) {
      router.replace("/(tabs)");
      return;
    }
    methods.setError("root", { message: "Correo o contraseña incorrectos" });
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-xl pt-24 pb-16">
        <View className="items-center gap-xl mb-5xl">
          <LogoSVG />
          <AppText size="xl" weight="bold">
            Inicia sesión
          </AppText>
        </View>
        <LoginForm
          methods={methods}
          onSubmit={onSubmit}
          onForgotPassword={() => {}}
          onRegister={() => router.push("/(onboarding)/personal-data")}
        />
      </View>
    </SafeAreaView>
  );
}
