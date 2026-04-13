import { AppText } from "@/components/ui/text";
import { StarSvg } from "@/components/icons/star-svg";
import { View } from "react-native";

export function PromoBanner() {
  return (
    <View className="flex-row items-start px-base pb-base gap-xs">
      <StarSvg />
      <View style={{ flex: 1 }}>
        <AppText size="base" color="secondary">
          ¿Monto mayor a $5.000 o S/18.000?{"\n"}
          <AppText
            size="base"
            color="secondary"
            weight="bold"
            className="underline"
          >
            ¡Obtén un Tipo de Cambio Preferencial!
          </AppText>
        </AppText>
      </View>
    </View>
  );
}
