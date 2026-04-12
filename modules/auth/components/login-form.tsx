import { FormCheckbox, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { AppText } from "@/components/ui/text";
import { router } from "expo-router";
import { FormProvider } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { useLoginForm } from "../hooks/use-login-form";

export function LoginForm() {
  const { methods, onSubmit } = useLoginForm();

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <View className="flex-1 justify-between">
        <View className="gap-base">
          <FormInput
            name="email"
            label="Correo electrónico"
            placeholder="Escribe tu correo"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            name="password"
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            isPassword
          />

          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <FormCheckbox name="rememberMe" label="Recordarme" />
            </View>
            <TouchableOpacity>
              <AppText size="sm" className="underline">
                ¿Olvidaste tu contraseña?
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View className="gap-sm">
          <Button
            label="Inicia sesión"
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />

          <View className="flex-row justify-center">
            <AppText color="gray-60">¿No tienes cuenta? </AppText>
            <TouchableOpacity
              onPress={() => router.push("/(onboarding)/personal-data")}
            >
              <AppText className="underline">Regístrate aquí</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </FormProvider>
  );
}
