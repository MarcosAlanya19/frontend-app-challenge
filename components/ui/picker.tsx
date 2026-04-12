import { AppText } from "@/components/ui/text";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { FontFamily } from "@/constants/theme";

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;

interface PickerOption {
  label: string;
  value: string;
}

interface IProps {
  visible: boolean;
  options: PickerOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  onAccept: () => void;
  onCancel: () => void;
}

function WheelPicker({
  options,
  selectedValue,
  onValueChange,
}: Pick<IProps, "options" | "selectedValue" | "onValueChange">) {
  const listRef = useRef<FlatList>(null);
  const selectedIndex = options.findIndex((o) => o.value === selectedValue);

  useEffect(() => {
    if (selectedIndex >= 0) {
      listRef.current?.scrollToIndex({
        index: selectedIndex,
        animated: false,
      });
    }
  }, []);

  const handleScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(index, options.length - 1));
    onValueChange(options[clamped].value);
  };

  return (
    <View style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}>
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: ITEM_HEIGHT * 2,
          left: 16,
          right: 16,
          height: ITEM_HEIGHT,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#E0E0E0",
        }}
      />
      <FlatList
        ref={listRef}
        data={options}
        keyExtractor={(item) => item.value}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * 2,
        }}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item }) => {
          const isSelected = item.value === selectedValue;
          return (
            <View
              style={{
                height: ITEM_HEIGHT,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppText
                size="md"
                weight={isSelected ? "semibold" : "regular"}
                color={isSelected ? "secondary" : "gray-40"}
              >
                {item.label}
              </AppText>
            </View>
          );
        }}
      />
    </View>
  );
}

export const Picker = ({
  visible,
  options,
  selectedValue,
  onValueChange,
  onAccept,
  onCancel,
}: IProps) => {
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
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-end">
        {visible && (
          <Animated.View
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(200)}
            className="absolute inset-0 bg-black/40"
          >
            <Pressable className="flex-1" onPress={onCancel} />
          </Animated.View>
        )}

        {visible && (
          <Animated.View
            entering={SlideInDown.duration(300).easing(
              Easing.out(Easing.cubic),
            )}
            exiting={SlideOutDown.duration(220).easing(Easing.in(Easing.cubic))}
            className="bg-white rounded-t-2xl overflow-hidden"
          >
            <View className="items-center pt-3 pb-1">
              <View className="w-10 h-1 rounded-full bg-gray-25" />
            </View>

            <View className="flex-row justify-between items-center px-base py-sm bg-gray-21">
              <TouchableOpacity onPress={onAccept} hitSlop={8}>
                <AppText
                  size="md"
                  weight="semibold"
                  style={{ color: "#2DB4FF" }}
                >
                  Aceptar
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCancel} hitSlop={8}>
                <AppText
                  size="md"
                  weight="semibold"
                  style={{ color: "#2DB4FF" }}
                >
                  Cancelar
                </AppText>
              </TouchableOpacity>
            </View>

            {Platform.OS === "ios" ? (
              <NativePicker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
              >
                {options.map((option) => (
                  <NativePicker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    fontFamily={FontFamily.medium}
                  />
                ))}
              </NativePicker>
            ) : (
              <WheelPicker
                options={options}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
              />
            )}
          </Animated.View>
        )}
      </View>
    </Modal>
  );
};
