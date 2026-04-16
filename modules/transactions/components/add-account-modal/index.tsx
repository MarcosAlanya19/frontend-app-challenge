import { FormCheckbox, FormInput, FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { AppText } from "@/components/ui/text";
import { ECurrency } from "@/enums/currency";
import { cn } from "@/lib/cn";
import banks from "@/mocks/bankAccounts.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useController, useForm } from "react-hook-form";
import { Modal, Pressable, ScrollView, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddAccountFormValues, addAccountSchema } from "./index.schema";

const ACCOUNT_TYPES = [
  { label: "Ahorros", value: "ahorros" },
  { label: "Corriente", value: "corriente" },
];

interface IProps {
  visible: boolean;
  onClose: () => void;
  onSave: (account: {
    accountType: string;
    bankId: string;
    currency: ECurrency;
    accountNumber: string;
    alias: string;
  }) => void;
}

const CurrencyToggle = () => {
  const { field } = useController<AddAccountFormValues, "currency">({
    name: "currency",
  });

  return (
    <View className="gap-sm">
      <AppText size="base" color="secondary" weight="medium">
        Moneda
      </AppText>
      <View className="flex-row gap-sm">
        <Pressable
          onPress={() => field.onChange(ECurrency.PEN)}
          className={cn(
            "flex-1 h-12 rounded-lg border items-center justify-center",
            field.value === ECurrency.PEN
              ? "bg-secondary border-secondary"
              : "bg-white border-gray-25",
          )}
        >
          <AppText
            size="base"
            weight="bold"
            color={field.value === ECurrency.PEN ? "white" : "gray-40"}
          >
            SOLES
          </AppText>
        </Pressable>
        <Pressable
          onPress={() => field.onChange(ECurrency.USD)}
          className={cn(
            "flex-1 h-12 rounded-lg border items-center justify-center",
            field.value === ECurrency.USD
              ? "bg-secondary border-secondary"
              : "bg-white border-gray-25",
          )}
        >
          <AppText
            size="base"
            weight="bold"
            color={field.value === ECurrency.USD ? "white" : "gray-40"}
          >
            DÓLARES
          </AppText>
        </Pressable>
      </View>
    </View>
  );
};

export const AddAccountModal = ({ visible, onClose, onSave }: IProps) => {
  const [isMounted, setIsMounted] = useState(visible);

  const form = useForm<AddAccountFormValues>({
    resolver: zodResolver(addAccountSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      accountType: "",
      bankId: "",
      currency: ECurrency.PEN,
      accountNumber: "",
      alias: "",
      declared: undefined,
    },
  });

  const { handleSubmit, watch, reset, formState } = form;
  const currency = watch("currency");

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      return;
    }
    const timer = setTimeout(() => setIsMounted(false), 220);
    return () => clearTimeout(timer);
  }, [visible]);

  const bankOptions = useMemo(
    () => banks.map((b) => ({ label: b.name, value: b.id })),
    [],
  );

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(({ declared: _, ...data }) => {
    onSave(data);
    handleClose();
  });

  const title =
    currency === ECurrency.PEN
      ? "Agregar cuenta soles"
      : "Agregar cuenta dólares";

  if (!isMounted) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-end">
        {visible && (
          <Animated.View
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(200)}
            className="absolute inset-0 bg-black/40"
          >
            <Pressable className="flex-1" onPress={handleClose} />
          </Animated.View>
        )}

        {visible && (
          <Animated.View
            entering={SlideInDown.duration(300).easing(
              Easing.out(Easing.cubic),
            )}
            exiting={SlideOutDown.duration(220).easing(Easing.in(Easing.cubic))}
            className="bg-white rounded-t-2xl overflow-hidden"
            style={{ maxHeight: "92%" }}
          >
            <View className="items-center pt-3 pb-1">
              <View className="w-10 h-1 rounded-full bg-gray-25" />
            </View>

            <View className="px-base py-5 border-b border-gray-20">
              <AppText size="xl" weight="bold" color="secondary">
                {title}
              </AppText>
            </View>

            <FormProvider {...form}>
              <ScrollView
                contentContainerClassName="px-base p-md gap-4"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <AppText size="md" color="secondary">
                  La cuenta que registres{" "}
                  <AppText size="md" weight="bold" color="secondary">
                    debe estar a tu nombre{" "}
                  </AppText>
                  (titular de este perfil en Kambista)
                </AppText>

                <FormSelect
                  name="accountType"
                  label="Tipo de cuenta bancaria"
                  sheetTitle="Tipo de cuenta bancaria"
                  options={ACCOUNT_TYPES}
                />

                <View className="gap-sm">
                  <FormSelect
                    name="bankId"
                    label="Entidad financiera"
                    sheetTitle="Entidad financiera"
                    options={bankOptions}
                  />
                  <Highlight variant="info">
                    <AppText size="sm" weight="medium" color="blue">
                      Operamos en Lima con todos los bancos. Y en provincia con
                      el{" "}
                      <AppText size="sm" weight="bold" color="blue">
                        BCP y cuentas digitales Interbank.
                      </AppText>
                    </AppText>
                  </Highlight>
                </View>

                <CurrencyToggle />

                <FormInput
                  name="accountNumber"
                  label="Número de cuenta"
                  placeholder="Escribe tu cuenta de destino"
                  keyboardType="numeric"
                />

                <FormInput
                  name="alias"
                  label="Ponle nombre a tu cuenta"
                  placeholder="Escribe un alias"
                />

                <FormCheckbox
                  name="declared"
                  label="Declaro que esta cuenta es mía"
                />
              </ScrollView>

              <SafeAreaView edges={["bottom"]}>
                <View className="px-base pb-md pt-sm">
                  <Button
                    label="Guardar cuenta"
                    onPress={onSubmit}
                    disabled={!formState.isValid}
                  />
                </View>
              </SafeAreaView>
            </FormProvider>
          </Animated.View>
        )}
      </View>
    </Modal>
  );
};
