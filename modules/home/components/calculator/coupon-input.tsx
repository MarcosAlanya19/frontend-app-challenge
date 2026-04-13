import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { Pressable, TextInput, View } from "react-native";

interface CouponInputProps {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
}

export function CouponInput({ value, onChange, onApply }: CouponInputProps) {
  return (
    <View
      className="flex-row items-center mx-base my-base overflow-hidden"
      style={{
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.gray25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 1,
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Ingresa el cupón"
        placeholderTextColor={Colors.gray40}
        style={{
          flex: 1,
          height: 52,
          paddingHorizontal: 16,
          fontFamily: "Montserrat_400Regular",
          fontSize: 14,
          color: Colors.secondary,
          backgroundColor: Colors.white,
        }}
      />
      <Pressable
        onPress={onApply}
        style={{
          height: 52,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.secondary,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <AppText size="sm" weight="semibold" color="white">
          APLICAR
        </AppText>
      </Pressable>
    </View>
  );
}
