import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormDateInput } from "@/components/form/form-date-input";
import { FormInput } from "@/components/form/form-input";
import { FormPickerInput } from "@/components/form/form-picker-input";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { AppText } from "@/components/ui/text";
import { FormProvider } from "react-hook-form";
import { ScrollView, View } from "react-native";
import {
  DOC_TYPE_OPTIONS,
  PREVIOUS_EXCHANGE_OPTIONS,
} from "../constants/options";
import { usePersonalDataForm } from "../hooks/use-personal-data-form";

export const PersonalDataForm = () => {
  const { form, onSubmit } = usePersonalDataForm();
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  return (
    <FormProvider {...form}>
      <View className="flex-1">
        <ScrollView
          className="flex-1 px-xl"
          contentContainerClassName="gap-base pb-xl"
          showsVerticalScrollIndicator={false}
        >
          <AppText
            size="md"
            weight="medium"
            className="pt-3xl pb-2xl text-center"
          >
            Completa tus datos{" "}
            <AppText size="md" weight="bold">
              {"como figuran\nen tu documento de identidad"}
            </AppText>
          </AppText>

          <FormInput
            name="fullName"
            label="Nombres completos"
            placeholder="Escribe tus nombres y apellidos"
          />

          <View className="flex-row items-end gap-sm">
            <FormPickerInput
              label="Documento"
              name="documentType"
              placeholder="Tipo"
              options={DOC_TYPE_OPTIONS}
              containerClassName="w-2/5"
            />
            <View className="flex-1">
              <FormInput name="documentNumber" placeholder="Nº de documento" />
            </View>
          </View>

          <Highlight
            variant="info"
            message="Tu documento de identidad debe coincidir con tus datos para evitar inconvenientes al momento de hacer una primera operación"
          />

          <View className="flex-row gap-sm">
            <View className="flex-1">
              <FormInput
                name="phone"
                label="Celular"
                placeholder="N° de celular"
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <FormDateInput name="birthDate" label="Fecha de nacimiento" />
            </View>
          </View>

          <FormPickerInput
            name="previousExchange"
            label="¿Donde cambiabas antes? (Opcional)"
            placeholder="Último lugar de cambio"
            options={PREVIOUS_EXCHANGE_OPTIONS}
          />
        </ScrollView>

        <View className="gap-base px-xl pb-xl pt-base">
          <FormCheckbox name="termsAccepted">
            <AppText weight="medium" size="sm">
              He leído y acepto los{" "}
              <AppText weight="bold" size="sm" className="underline">
                Términos y condiciones
              </AppText>
            </AppText>
          </FormCheckbox>

          <FormCheckbox name="privacyAccepted">
            <AppText weight="medium" size="sm">
              Acepto de manera expresa e informada la{" "}
              <AppText weight="bold" size="sm" className="underline">
                Política de Tratamiento de datos personales de Kambista
              </AppText>
            </AppText>
          </FormCheckbox>

          <View className="pt-9">
            <Button
              label="Registrarme"
              disabled={!isValid || isSubmitting}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </FormProvider>
  );
};
