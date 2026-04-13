import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useErrorStore } from "@/stores/use-error-store";

const SUPPORT_WHATSAPP = "https://wa.me/51900000000";
const SHEET_HEIGHT = 300;

export function ErrorBottomSheet() {
  const { error, clearError } = useErrorStore();
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 180,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SHEET_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setModalVisible(false));
    }
  }, [error]);

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={clearError}
    >
      <Animated.View
        style={{ flex: 1, justifyContent: "flex-end", opacity: backdropOpacity }}
        className="bg-black/40"
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={clearError}
        />
        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="bg-white rounded-t-2xl p-6 items-center gap-4"
        >
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
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
