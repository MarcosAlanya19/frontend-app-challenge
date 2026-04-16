import { useController, useFormContext } from "react-hook-form";
import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { dateToDMY, dmyToDate, getToday } from "@/lib/date";
import { cn } from "@/lib/cn";

interface FormDateInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  containerClassName?: string;
}

export function FormDateInput({
  name,
  label,
  placeholder = "DD/MM/AAAA",
  containerClassName,
}: FormDateInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(getToday());

  const handleOpen = () => {
    setTempDate(dmyToDate(field.value));
    setIsMounted(true);
    setTimeout(() => setVisible(true), 0);
  };

  const handleAccept = () => {
    field.onChange(dateToDMY(tempDate));
    setVisible(false);
    setTimeout(() => setIsMounted(false), 220);
  };

  const handleCancel = () => {
    setVisible(false);
    setTimeout(() => setIsMounted(false), 220);
  };

  const handleAndroidChange = (event: DateTimePickerEvent, date?: Date) => {
    setIsMounted(false);
    if (event.type === "set" && date) {
      field.onChange(dateToDMY(date));
    }
  };

  return (
    <View className={cn("gap-1", containerClassName)}>
      {label && (
        <AppText size="sm" color="gray-60">
          {label}
        </AppText>
      )}

      <TouchableOpacity
        onPress={handleOpen}
        activeOpacity={0.8}
        className={cn(
          "flex-row items-center h-12 px-3 rounded-lg border bg-white",
          {
            "border-red": !!fieldState.error,
            "border-gray-25": !fieldState.error,
          },
        )}
      >
        <View className="flex-1">
          <AppText
            weight="regular"
            color={field.value ? "secondary" : "gray-40"}
          >
            {field.value || placeholder}
          </AppText>
        </View>
        <Ionicons name="calendar-outline" size={20} color={Colors.gray40} />
      </TouchableOpacity>

      {fieldState.error && (
        <AppText size="sm" color="red">
          {fieldState.error.message}
        </AppText>
      )}

      {isMounted && Platform.OS === "android" && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          maximumDate={getToday()}
          onChange={handleAndroidChange}
        />
      )}

      {isMounted && Platform.OS === "ios" && (
        <Modal
          visible
          transparent
          animationType="none"
          onRequestClose={handleCancel}
        >
          <View className="flex-1 justify-end">
            {visible && (
              <Animated.View
                entering={FadeIn.duration(250)}
                exiting={FadeOut.duration(200)}
                className="absolute inset-0 bg-black/40"
              >
                <Pressable className="flex-1" onPress={handleCancel} />
              </Animated.View>
            )}
            {visible && (
              <Animated.View
                entering={SlideInDown.duration(300).easing(
                  Easing.out(Easing.cubic),
                )}
                exiting={SlideOutDown.duration(220).easing(
                  Easing.in(Easing.cubic),
                )}
                className="bg-white rounded-t-2xl"
              >
                {/* Handle */}
                <View className="items-center pt-3 pb-1">
                  <View className="w-10 h-1 rounded-full bg-gray-25" />
                </View>

                {/* Toolbar */}
                <View className="flex-row justify-between items-center px-base py-sm bg-gray-21">
                  <TouchableOpacity onPress={handleAccept} hitSlop={8}>
                    <AppText
                      size="md"
                      weight="semibold"
                      style={{ color: "#2DB4FF" }}
                    >
                      Aceptar
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancel} hitSlop={8}>
                    <AppText
                      size="md"
                      weight="semibold"
                      style={{ color: "#2DB4FF" }}
                    >
                      Cancelar
                    </AppText>
                  </TouchableOpacity>
                </View>

                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  maximumDate={getToday()}
                  locale="es-PE"
                  style={{ height: 200 }}
                  onChange={(_, date) => {
                    if (date) setTempDate(date);
                  }}
                />
              </Animated.View>
            )}
          </View>
        </Modal>
      )}
    </View>
  );
}
