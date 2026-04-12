import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
}

export function Button({
  label,
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      className={cn("h-14 w-full rounded-md items-center justify-center", {
        "bg-primary-ultra-light": disabled,
        "bg-primary": !disabled && variant === "primary",
        "bg-secondary": !disabled && variant === "secondary",
      })}
      {...props}
    >
      <Text
        className={cn("font-semibold text-base", {
          "text-gray-40": disabled,
          "text-white": !disabled && variant === "secondary",
          "text-secondary": !disabled && variant === "primary",
        })}
      >
        {label.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}
