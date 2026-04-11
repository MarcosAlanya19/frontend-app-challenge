import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { cn } from "@/lib/cn";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  rightIcon,
  isPassword,
  ...props
}: InputProps) {
  const [secure, setSecure] = useState(isPassword ?? false);
  const [focused, setFocused] = useState(false);

  return (
    <View className="gap-1">
      {label && (
        <Text className="font-regular text-sm text-gray-60">{label}</Text>
      )}
      <View
        className={cn("flex-row items-center h-12 px-3 rounded-lg border bg-white", {
          "border-red": !!error,
          "border-primary": !error && focused,
          "border-gray-25": !error && !focused,
        })}
      >
        <TextInput
          className="flex-1 font-regular text-base text-secondary"
          placeholderTextColor={Colors.gray40}
          secureTextEntry={secure}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {isPassword ? (
          <TouchableOpacity onPress={() => setSecure((prev) => !prev)}>
            <Ionicons
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={Colors.gray40}
            />
          </TouchableOpacity>
        ) : (
          rightIcon
        )}
      </View>
      {error && (
        <Text className="font-regular text-xs text-red">{error}</Text>
      )}
    </View>
  );
}
