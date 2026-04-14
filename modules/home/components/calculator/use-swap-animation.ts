import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export function useSwapAnimation(isCalculating: boolean) {
  const rotation = useRef(new Animated.Value(0)).current;

  const triggerSwapAnimation = () => {
    rotation.setValue(0);
    Animated.timing(rotation, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

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

  return { rotate, triggerSwapAnimation };
}
