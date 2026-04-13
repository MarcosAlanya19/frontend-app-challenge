import { Colors } from "@/constants/theme";
import { CURRENCY_LABEL, ECurrency } from "@/enums/currency";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { CurrencyRow } from "./currency-row";

interface IProps {
  sendCurrency: ECurrency;
  receiveCurrency: ECurrency;
  sendAmount: string;
  receiveAmount: string;
  onSendAmountChange: (value: string) => void;
  onReceiveAmountChange: (value: string) => void;
  isSendCalculating: boolean;
  isReceiveCalculating: boolean;
  onSwap: () => void;
}

export function CalculatorInput({
  sendCurrency,
  receiveCurrency,
  sendAmount,
  receiveAmount,
  onSendAmountChange,
  onReceiveAmountChange,
  isSendCalculating,
  isReceiveCalculating,
  onSwap,
}: IProps) {
  const rotation = useRef(new Animated.Value(0)).current;

  const triggerSwapAnimation = () => {
    rotation.setValue(0);
    Animated.timing(rotation, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    onSwap();
  };

  const isCalculating = isSendCalculating || isReceiveCalculating;

  useEffect(() => {
    if (!isCalculating) return;
    const spin = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    spin.start();
    return () => spin.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalculating]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="mx-3.5 mt-8">
      <CurrencyRow
        label="¿Cuánto envías?"
        currencyLabel={CURRENCY_LABEL[sendCurrency]}
      >
        {isSendCalculating ? (
          <ActivityIndicator size="small" color={Colors.secondary} />
        ) : (
          <TextInput
            value={sendAmount}
            onChangeText={onSendAmountChange}
            keyboardType="numeric"
            placeholderTextColor={Colors.gray40}
            placeholder="0"
            style={{
              fontSize: 22,
              fontFamily: "Montserrat_700Bold",
              color: Colors.secondary,
              padding: 0,
            }}
          />
        )}
      </CurrencyRow>

      <View style={{ alignItems: "flex-end", paddingRight: 94, zIndex: 1 }}>
        <View
          style={{
            width: 62,
            height: 62,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: -26,
            backgroundColor: "#19223230",
            boxShadow: "0px 3px 25px 0px #00000026",
          }}
        >
          <Pressable
            onPress={triggerSwapAnimation}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: Colors.white,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Ionicons
                name="sync-outline"
                size={22}
                color={Colors.secondary}
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>

      <CurrencyRow
        label="Entonces recibes"
        currencyLabel={CURRENCY_LABEL[receiveCurrency]}
      >
        {isReceiveCalculating ? (
          <ActivityIndicator size="small" color={Colors.secondary} />
        ) : (
          <TextInput
            value={receiveAmount}
            onChangeText={onReceiveAmountChange}
            keyboardType="numeric"
            placeholderTextColor={Colors.gray40}
            placeholder="0"
            style={{
              fontSize: 22,
              fontFamily: "Montserrat_700Bold",
              color: Colors.secondary,
              padding: 0,
            }}
          />
        )}
      </CurrencyRow>
    </View>
  );
}
