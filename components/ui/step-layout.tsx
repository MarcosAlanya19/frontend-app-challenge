import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StepIndicator } from "./step-indicator";

interface StepLayoutProps {
  steps: string[];
  currentStep: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function StepLayout({
  steps,
  currentStep,
  children,
  footer,
}: StepLayoutProps) {
  return (
    <View className="flex-1" style={{ backgroundColor: "#f7f6f8" }}>
      <View className="pt-3.5 pb-6">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </View>
      <View className="flex-1">{children}</View>
      {footer && (
        <SafeAreaView edges={["bottom"]}>
          <View className="px-base pb-md">{footer}</View>
        </SafeAreaView>
      )}
    </View>
  );
}
