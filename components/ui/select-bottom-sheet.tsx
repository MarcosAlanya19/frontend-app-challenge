import { AppText } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, View } from "react-native";
import Animated, {
    Easing,
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideOutDown,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface SelectOption {
  label: string;
  value: string;
  subtitle?: string;
}

interface SelectBottomSheetProps {
  visible: boolean;
  title: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
  onClose: () => void;
  footer?: React.ReactNode;
}

export function SelectBottomSheet({
  visible,
  title,
  options,
  onSelect,
  onClose,
  footer,
}: SelectBottomSheetProps) {
  const [isMounted, setIsMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      return;
    }
    const timer = setTimeout(() => setIsMounted(false), 220);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!isMounted) return null;

  return (
    <Modal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        {visible && (
          <Animated.View
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(200)}
            className="absolute inset-0 bg-black/40"
          >
            <Pressable className="flex-1" onPress={onClose} />
          </Animated.View>
        )}

        {visible && (
          <Animated.View
            entering={SlideInDown.duration(300).easing(
              Easing.out(Easing.cubic),
            )}
            exiting={SlideOutDown.duration(220).easing(Easing.in(Easing.cubic))}
            className="bg-white rounded-t-2xl overflow-hidden"
            style={{ maxHeight: "70%" }}
          >
            <View className="items-center pt-3 pb-1">
              <View className="w-10 h-1 rounded-full bg-gray-25" />
            </View>

            <View className="px-base py-md border-b border-gray-20">
              <AppText size="md" weight="bold" color="secondary">
                {title}
              </AppText>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              contentContainerClassName="pb-sm"
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => onSelect(item.value)}
                  className="px-base py-md border-b border-gray-20"
                >
                  <AppText size="base" color="secondary">
                    {item.label}
                  </AppText>
                  {item.subtitle && (
                    <AppText size="sm" color="gray-40">
                      {item.subtitle}
                    </AppText>
                  )}
                </Pressable>
              )}
            />

            <SafeAreaView edges={["bottom"]}>{footer}</SafeAreaView>
          </Animated.View>
        )}
      </View>
    </Modal>
  );
}
