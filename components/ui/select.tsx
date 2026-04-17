import { SelectBottomSheet } from "@/components/ui/select-bottom-sheet";
import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";

export interface ISelectOption {
  label: string;
  value: string;
  subtitle?: string;
}

interface SelectProps {
  label: string;
  sheetTitle: string;
  options: ISelectOption[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  footer?:
    | React.ReactNode
    | ((helpers: { close: () => void }) => React.ReactNode);
  error?: string;
}

export function Select({
  label,
  sheetTitle,
  options,
  value,
  onSelect,
  placeholder = "Selecciona",
  footer,
  error,
}: SelectProps) {
  const [sheetVisible, setSheetVisible] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label;
  const closeSheet = () => setSheetVisible(false);

  return (
    <View>
      <View className="gap-sm">
        <AppText size="base" color="gray-60" weight="medium">
          {label}
        </AppText>
        <Pressable
          onPress={() => setSheetVisible(true)}
          className="flex-row items-center h-14 px-base rounded-lg border bg-white"
          style={{
            borderColor: error ? Colors.red : Colors.gray25,
          }}
        >
          <View style={{ flex: 1 }}>
            <AppText
              size="base"
              weight={selectedLabel ? "medium" : "regular"}
              color={selectedLabel ? "secondary" : "gray-40"}
            >
              {selectedLabel || placeholder}
            </AppText>
          </View>
          <Ionicons name="chevron-down" size={20} color={Colors.gray40} />
        </Pressable>
        {error && (
          <AppText size="sm" color="red">
            {error}
          </AppText>
        )}
      </View>

      <SelectBottomSheet
        visible={sheetVisible}
        title={sheetTitle}
        options={options}
        onSelect={(val) => {
          onSelect(val);
          closeSheet();
        }}
        onClose={closeSheet}
        footer={
          typeof footer === "function" ? footer({ close: closeSheet }) : footer
        }
      />
    </View>
  );
}
