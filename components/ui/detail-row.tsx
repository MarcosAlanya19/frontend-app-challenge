import { useState, useCallback } from "react";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";

export const DetailRow = ({
  label,
  value,
  copyable = false,
  labelSize = "sm",
}: {
  label: string;
  value: string;
  copyable?: boolean;
  labelSize?: "sm" | "base";
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!copyable) return;
    await Clipboard.setStringAsync(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value, copyable]);

  const Content = (
    <View className="py-2.5">
      <AppText size={labelSize} weight="bold" color="gray-60">
        {label}
      </AppText>
      <View className="flex-row items-center gap-md mt-1 pl-2">
        <AppText size="base" weight="bold" color="secondary">
          {value}
        </AppText>
        {copyable && (
          <Ionicons
            name={copied ? "checkmark-outline" : "copy-outline"}
            size={20}
            color={copied ? Colors.green : Colors.gray40}
          />
        )}
      </View>
    </View>
  );

  if (copyable) {
    return (
      <Pressable onPress={handleCopy} hitSlop={8}>
        {Content}
      </Pressable>
    );
  }

  return Content;
};
