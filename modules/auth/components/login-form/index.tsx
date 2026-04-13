import { FormCheckbox, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { AppText } from "@/components/ui/text";
import { FormProvider, UseFormReturn, useFormState } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { ILoginFormData } from "./index.schema";

interface IProps {
  methods: UseFormReturn<ILoginFormData>;
  onSubmit: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

export const LoginForm = ({
  methods,
  onSubmit,
  onForgotPassword,
  onRegister,
}: IProps) => {
  const { errors, isValid, isSubmitting } = useFormState({
    control: methods.control,
  });

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

          <View className="flex-row justify-between items-center pb-2">
            <View className="flex-1">
              <FormCheckbox name="rememberMe" label="Recordarme" />
            </View>
            <TouchableOpacity onPress={onForgotPassword}>
              <AppText size="sm" className="underline">
                ¿Olvidaste tu contraseña?
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View className="gap-sm">
          {errors.root && (
            <AppText size="sm" color="red" className="text-center">
              {errors.root.message}
            </AppText>
          )}
          <Button
            label="Inicia sesión"
            disabled={!isValid || isSubmitting}
            onPress={onSubmit}
          />

          <View className="flex-row justify-center">
            <AppText color="gray-60">¿No tienes cuenta? </AppText>
            <TouchableOpacity onPress={onRegister}>
              <AppText className="underline">Regístrate aquí</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </FormProvider>
  );
};
