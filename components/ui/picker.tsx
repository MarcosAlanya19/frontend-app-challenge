import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { Colors } from "@/constants/theme";

interface PickerOption {
  label: string;
  value: string;
}

interface PickerProps {
  visible: boolean;
  options: PickerOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  onAccept: () => void;
  onCancel: () => void;
}

export function Picker({
  visible,
  options,
  selectedValue,
  onValueChange,
  onAccept,
  onCancel,
}: PickerProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-end bg-black/30">
        <View className="bg-white">
          <View className="flex-row justify-between px-4 py-2 bg-gray-10 border-b border-gray-25">
            <TouchableOpacity onPress={onCancel}>
              <Text className="font-medium text-md text-blue">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAccept}>
              <Text className="font-medium text-md text-blue">Aceptar</Text>
            </TouchableOpacity>
          </View>
          <NativePicker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
          >
            {options.map((option) => (
              <NativePicker.Item
                key={option.value}
                label={option.label}
                value={option.value}
                color={Colors.secondary}
              />
            ))}
          </NativePicker>
        </View>
      </View>
    </Modal>
  );
}
