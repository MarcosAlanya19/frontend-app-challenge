import { FormProvider } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormInput } from "@/components/form/form-input";
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

          <View className="flex-row items-center justify-between">
            <FormCheckbox name="rememberMe" label="Recordarme" />
            <TouchableOpacity>
              <Text className="font-regular text-sm text-secondary underline">
                ¿Olvidaste tu contraseña?
              </Text>
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
            <Text className="font-regular text-base text-gray-60">
              ¿No tienes cuenta?
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(onboarding)/personal-data")}
            >
              <Text className="font-regular text-base text-secondary underline">
                Regístrate aquí
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </FormProvider>
  );
}
