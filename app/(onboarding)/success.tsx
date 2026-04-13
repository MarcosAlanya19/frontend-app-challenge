import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image } from "react-native";
import { AppText } from "@/components/ui/text";
import { useLocalSearchParams, router } from "expo-router";
import { Button } from "@/components/ui/button";

export default function SuccessScreen() {
  const { name } = useLocalSearchParams<{
    name: string;
  }>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-base py-xl gap-28">
        <AppText size="base" weight="bold" className="text-center">
          Perfil creado con éxito
        </AppText>

        <View className="gap-16">
          <View className="items-center gap-7">
            <Image
              source={require("@/assets/images/celphone.png")}
              style={{ width: 126, height: 187 }}
              resizeMode="contain"
            />
            <AppText size="2xl" weight="bold" className="text-center">
              ¡Felicitaciones {name},{"\n"}tu perfil ha sido creado!
            </AppText>
            <AppText
              weight="medium"
              size="md"
              color="gray-60"
              className="text-center"
            >
              Ya puedes empezar a{" "}
              <AppText
                weight="medium"
                size="md"
                color="gray-60"
                className="italic"
              >
                Kambiar
              </AppText>{" "}
              con la mejor tasa del mercado
            </AppText>
          </View>

          <Button label="Continuar" onPress={() => router.replace("/(tabs)")} />
        </View>
      </View>
    </SafeAreaView>
  );
}
