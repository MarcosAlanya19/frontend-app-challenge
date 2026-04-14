import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { View } from "react-native";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <View className="flex-row items-center">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <View key={label} className="flex-1 items-center">
            <View className="flex-row items-center w-full">
              <View
                className="flex-1 h-0.5"
                style={{
                  backgroundColor:
                    index > 0
                      ? isCompleted || isActive
                        ? Colors.secondary
                        : Colors.gray40
                      : "transparent",
                }}
              />

              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor:
                    isCompleted || isActive ? Colors.secondary : Colors.gray40,
                }}
              />

              <View
                className="flex-1 h-0.5"
                style={{
                  backgroundColor: !isLast
                    ? isCompleted
                      ? Colors.secondary
                      : Colors.gray40
                    : "transparent",
                }}
              />
            </View>

            <AppText
              size="sm"
              weight={"bold"}
              color={isActive || isCompleted ? "secondary" : "gray-40"}
              className="mt-1"
            >
              {label}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}
