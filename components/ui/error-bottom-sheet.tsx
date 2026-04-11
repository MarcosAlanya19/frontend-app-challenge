import { Linking, Modal, Text, TouchableOpacity, View } from "react-native";
import { useErrorStore } from "@/stores/use-error-store";

const SUPPORT_WHATSAPP = "https://wa.me/51900000000";

export function ErrorBottomSheet() {
  const { error, clearError } = useErrorStore();

  return (
    <Modal
      visible={!!error}
      transparent
      animationType="slide"
      onRequestClose={clearError}
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white rounded-t-2xl p-6 items-center gap-4">
          <Text className="font-bold text-xl text-secondary text-center">
            {error?.title}
          </Text>
          <Text className="font-regular text-base text-gray-60 text-center leading-6">
            {error?.message}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={clearError}
            className="w-full h-14 bg-secondary rounded-2xl items-center justify-center"
          >
            <Text className="font-semibold text-base text-white">ACEPTAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(SUPPORT_WHATSAPP)}>
            <Text className="font-regular text-base text-gray-60">
              ¿Problemas?{" "}
              <Text className="text-secondary underline">
                Contacta a soporte
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
