import { cn } from "@/lib/cn";
import { Text, type TextProps } from "react-native";

const sizeClasses = {
  sm: "text-sm",
  base: "text-base",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
} as const;

const weightClasses = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const colorClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  "secondary-light": "text-secondary-light",
  "secondary-lighter": "text-secondary-lighter",
  "gray-40": "text-gray-40",
  "gray-60": "text-gray-60",
  "gray-66": "text-gray-66",
  red: "text-red",
  green: "text-green",
  blue: "text-blue",
  white: "text-white",
  brown: "text-brown",
} as const;

export type TextSize = keyof typeof sizeClasses;
export type TextWeight = keyof typeof weightClasses;
export type TextColor = keyof typeof colorClasses;

interface AppTextProps extends TextProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
}

export function AppText({
  size = "base",
  weight = "regular",
  color = "secondary",
  className,
  ...props
}: AppTextProps) {
  return (
    <Text
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className,
      )}
      {...props}
    />
  );
}
