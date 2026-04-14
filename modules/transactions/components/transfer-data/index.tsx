import { Button } from "@/components/ui/button";
import { DetailRow } from "@/components/ui/detail-row";
import { StepLayout } from "@/components/ui/step-layout";
import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { Image, ScrollView, View } from "react-native";
import { TransferDetails } from "../../types";

const STEPS = ["Completa", "Transfiere", "Constancia"];

interface TransferDataProps {
  details: TransferDetails;
  updateTime: string;
  onConfirm: () => void;
}

export function TransferData({
  details,
  updateTime,
  onConfirm,
}: TransferDataProps) {
  return (
    <StepLayout
      steps={STEPS}
      currentStep={1}
      footer={<Button label="Ya hice mi transferencia" onPress={onConfirm} />}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-xl"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-base px-xl">
          <AppText
            size="sm"
            weight="medium"
            color="gray-60"
            className="text-center"
          >
            El tipo de cambio podría actualizarse a las:{" "}
            <AppText size="lg" weight="bold" color="gray-60">
              {updateTime}
            </AppText>
          </AppText>
        </View>

        <View className="bg-white px-9 py-5 mx-6 my-6 rounded-md gap-3">
          <View className="items-center">
            <Image
              source={require("@/assets/images/transfiere.png")}
              style={{ width: 68, height: 74 }}
              resizeMode="contain"
            />
          </View>

          <View className="items-justify">
            <AppText size="md" color="gray-60" className="text-justify">
              Transfiere desde tu app bancaria y guarda el{" "}
              <AppText
                size="md"
                weight="bold"
                color="secondary"
                className="underline"
              >
                número o código de operación
              </AppText>{" "}
              para el siguiente paso.
            </AppText>
          </View>

          <View
            className="mx-4 rounded-md  bg-white"
            style={{ borderWidth: 1, borderColor: Colors.gray25 }}
          >
            <View className="px-base py-md">
              <DetailRow label="Banco" value={details.bankName} />
              <DetailRow label="Monto" value={details.amount} copyable />
              <DetailRow
                label="Número de cuenta"
                value={details.accountNumber}
                copyable
              />
              <DetailRow label="RUC" value={details.ruc} copyable />
              <DetailRow label="Titular de la cuenta" value={details.holder} />
              <DetailRow label="Tipo de cuenta" value={details.accountType} />
            </View>
          </View>
        </View>
      </ScrollView>
    </StepLayout>
  );
}
