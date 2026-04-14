import { FileUpload } from "@/components/form";
import { Button } from "@/components/ui/button";
import { StepLayout } from "@/components/ui/step-layout";
import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { ITransactionForm } from "@/modules/transactions/types/ITransactionForm.type";
import { useFormContext, useWatch } from "react-hook-form";
import { Image, ScrollView, View } from "react-native";

const STEPS = ["Completa", "Transfiere", "Constancia"];

interface IProps {
  isLoading: boolean;
  onSubmit: () => void;
}

export const AttachVoucher = ({ isLoading, onSubmit }: IProps) => {
  const { control } = useFormContext<ITransactionForm>();
  const fileName = useWatch({ control, name: "fileName" });

  return (
    <StepLayout
      steps={STEPS}
      currentStep={2}
      footer={
        <Button
          label="Enviar constancia"
          disabled={!fileName || isLoading}
          onPress={onSubmit}
        />
      }
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-xl"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="mx-6 rounded-md items-center p-xl bg-white gap-4"
          style={{
            borderWidth: 1,
            borderColor: Colors.gray23,
          }}
        >
          <Image
            source={require("@/assets/images/voucher.png")}
            style={{ width: 132, height: 73 }}
            resizeMode="contain"
          />

          <AppText size="md" color="gray-60">
            Adjunta la constancia de tu transferencia para poder verificar tu
            operación.
          </AppText>

          <View
            className="w-full rounded-md py-3 px-3 gap-2"
            style={{ borderWidth: 1, borderColor: Colors.gray23 }}
          >
            <AppText size="base" color="secondary">
              Sube el archivo de tu constancia
            </AppText>
            <FileUpload name="fileName" uriName="fileUri" />
          </View>

          <View className="w-full">
            <AppText size="base" weight="bold" color="gray-66">
              Recuerda:
            </AppText>
            <View className="mt-sm gap-y-2">
              {[
                {
                  text: (
                    <AppText size="sm" color="gray-66">
                      El voucher enviado debe tener el{" "}
                      <AppText size="sm" weight="bold" color="gray-66">
                        monto, datos, del beneficiario, fecha y hora.
                      </AppText>
                    </AppText>
                  ),
                },
                {
                  text: (
                    <AppText size="sm" color="gray-66">
                      El voucher debe ser legible
                    </AppText>
                  ),
                },
                {
                  text: (
                    <AppText size="sm" color="gray-66">
                      Archivos permitidos{" "}
                      <AppText size="sm" weight="bold" color="gray-66">
                        imágenes, word y PDF
                      </AppText>
                    </AppText>
                  ),
                },
              ].map((item, index) => (
                <View key={index} className="flex-row items-start">
                  <AppText size="sm" color="gray-66" className="mr-2">
                    •
                  </AppText>
                  <View className="flex-1">{item.text}</View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </StepLayout>
  );
};
