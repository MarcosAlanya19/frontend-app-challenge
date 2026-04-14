import { Button } from "@/components/ui/button";
import { DetailRow } from "@/components/ui/detail-row";
import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DiscountsBanner } from "./discounts-banner";

interface TransactionCreatedProps {
  receiveAmount: string;
  transactionId: string;
  onGoHome: () => void;
}

export function TransactionCreated({
  receiveAmount,
  transactionId,
  onGoHome,
}: TransactionCreatedProps) {
  return (
    <View className="flex-1 bg-gray-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-base pb-xl"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="mt-xl rounded-md mx-base bg-white"
          style={{ borderWidth: 1, borderColor: Colors.gray25 }}
        >
          <View className="items-center  px-xl py-xl">
            <Image
              source={require("@/assets/images/happy-pig.png")}
              style={{ width: 103, height: 93 }}
              resizeMode="contain"
            />

            <View
              className="w-full mt-base pb-md"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.gray25,
              }}
            >
              <AppText
                size="xl"
                weight="bold"
                color="secondary"
                className="text-center"
              >
                ¡Constancia enviada!
              </AppText>
            </View>

            <View className="w-full gap-gap-2">
              <DetailRow
                labelSize="base"
                label="Código Kambista"
                value={transactionId}
              />
              <AppText size="base" color="secondary">
                *Usa tu código para dar seguimiento a tu operación.
              </AppText>

              <DetailRow
                labelSize="base"
                label="Monto a recibir"
                value={`S/ ${receiveAmount}`}
              />
              <DetailRow
                labelSize="base"
                label="Tiempo estimado de espera"
                value="20h 15min"
              />
            </View>
          </View>
        </View>

        <DiscountsBanner />

        <View className="mt-base items-center px-xl">
          <AppText size="base" color="secondary" className="text-center">
            Verificaremos tu operación. Puedes ver su estado en &ldquo;Mis
            operaciones&rdquo;.
          </AppText>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]}>
        <View className="px-base pb-md">
          <Button label="Volver a inicio" onPress={onGoHome} />
        </View>
      </SafeAreaView>
    </View>
  );
}
