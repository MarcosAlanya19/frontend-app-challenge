import { FormPickerInput, FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { ISelectOption } from "@/components/ui/select";
import { StepLayout } from "@/components/ui/step-layout";
import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { ITransactionSummary as TransactionSummaryType } from "../../types";
import { ITransactionForm } from "../../types/ITransactionForm.type";
import { TransactionSummary } from "./transaction-summary";

const STEPS = ["Completa", "Transfiere", "Constancia"];

interface IProps {
  summary: TransactionSummaryType;
  bankOptions: ISelectOption[];
  accountOptions: ISelectOption[];
  fundOptions: ISelectOption[];
  onContinue: () => void;
  onAddAccount: () => void;
}

export const CreateTransaction = ({
  summary,
  bankOptions,
  accountOptions,
  fundOptions,
  onContinue,
  onAddAccount,
}: IProps) => {
  const { control } = useFormContext<ITransactionForm>();

  const sourceBankId = useWatch({ control, name: "sourceBankId" });
  const destinationAccountId = useWatch({
    control,
    name: "destinationAccountId",
  });
  const sourceFundId = useWatch({ control, name: "sourceFundId" });

  const isValid = !!sourceBankId && !!destinationAccountId && !!sourceFundId;

  return (
    <StepLayout
      steps={STEPS}
      currentStep={0}
      footer={
        <Button label="Continuar" disabled={!isValid} onPress={onContinue} />
      }
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-xl"
        showsVerticalScrollIndicator={false}
      >
        <TransactionSummary summary={summary} />

        <View className="mt-base mx-6">
          <Highlight variant="info">
            <AppText size="sm" weight="medium" color="blue">
              Tiempo estimado de espera{" "}
              <AppText size="sm" weight="semibold" color="blue">
                BCP, Interbank, BanBif, Pichincha:
              </AppText>{" "}
              15 minutos.{" "}
              <AppText size="sm" weight="semibold" color="blue">
                Otros bancos:
              </AppText>{" "}
              1 día hábil
            </AppText>
          </Highlight>
        </View>

        <View className="px-base mt-xl gap-xl">
          <FormSelect
            name="sourceBankId"
            label="¿Desde qué banco nos envías tu dinero?"
            sheetTitle="¿Desde qué banco nos envías tu dinero?"
            options={bankOptions}
          />

          <FormSelect
            name="destinationAccountId"
            label="¿En qué cuenta deseas recibir tu dinero?"
            sheetTitle="Selecciona tu cuenta destino"
            options={accountOptions}
            footer={
              <Pressable
                onPress={onAddAccount}
                className="flex-row items-center gap-sm px-base py-md"
              >
                <View className="w-10 h-10 rounded-md border border-gray-25 items-center justify-center">
                  <Ionicons name="add" size={20} color={Colors.secondary} />
                </View>
                <AppText size="base" color="secondary" weight="medium">
                  Agregar cuenta
                </AppText>
              </Pressable>
            }
          />

          <Highlight variant="warning">
            <AppText size="sm" color="brown">
              Recuerda que las cuentas deben estar{" "}
              <AppText size="sm" weight="bold" color="brown">
                a tu nombre.
              </AppText>{" "}
              Kambista{" "}
              <AppText size="sm" weight="bold" color="brown">
                no transfiere a cuentas de terceros
              </AppText>
            </AppText>
          </Highlight>

          <FormPickerInput
            name="sourceFundId"
            label="Origen de fondos"
            placeholder="Selecciona"
            options={fundOptions}
          />
        </View>
      </ScrollView>
    </StepLayout>
  );
};
