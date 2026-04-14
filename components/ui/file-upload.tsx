import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import React from "react";
import { Pressable, View } from "react-native";
import { UploadPictureSvg } from "../icons/upload-picture-svg";

interface IProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onPress: () => void;
  helperText?: string;
  error?: string;
}

export function FileUploadUI({
  label,
  value,
  placeholder = "Selecciona archivo",
  onPress,
  helperText,
  error,
}: IProps) {
  return (
    <View className="w-full">
      {label && (
        <AppText size="sm" weight="semibold" color="secondary" className="mb-2">
          {label}
        </AppText>
      )}
      <Pressable
        onPress={onPress}
        className="flex-row items-center h-14 pl-7 pr-4 rounded-lg border bg-white"
        style={{ borderColor: error ? Colors.red : Colors.gray25 }}
      >
        <AppText
          size="base"
          color={value ? "secondary" : "gray-66"}
          className="flex-1"
          numberOfLines={1}
        >
          {value || placeholder}
        </AppText>
        <UploadPictureSvg />
      </Pressable>

      {error ? (
        <AppText size="sm" color="red" className="mt-2">
          {error}
        </AppText>
      ) : (
        helperText && (
          <AppText size="sm" color="gray-60" className="mt-2">
            {helperText}
          </AppText>
        )
      )}

      <AppText size="sm" color="gray-60" className="mt-2">
        *Tamaño máximo permitido del archivo 10 Mb
      </AppText>
    </View>
  );
}
