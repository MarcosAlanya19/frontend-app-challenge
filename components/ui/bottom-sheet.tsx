import { Modal, Text, TouchableOpacity, Pressable } from "react-native";

interface BottomSheetProps {
  visible: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function BottomSheet({
  visible,
  icon,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
}: BottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 bg-black/40 items-center justify-center px-6"
        onPress={onCancel}
      >
        <Pressable className="w-full bg-white rounded-2xl p-6 items-center gap-4">
          {icon}
          <Text className="font-bold text-xl text-secondary text-center">
            {title}
          </Text>
          <Text className="font-regular text-base text-gray-60 text-center leading-6">
            {description}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onConfirm}
            className="w-full h-14 bg-secondary rounded-2xl items-center justify-center"
          >
            <Text className="font-semibold text-base text-white">
              {confirmLabel.toUpperCase()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel}>
            <Text className="font-regular text-base text-secondary underline">
              Cancelar
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
