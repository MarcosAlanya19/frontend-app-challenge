import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Highlight } from "@/components/ui/highlight";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Picker } from "@/components/ui/picker";
import { Colors } from "@/constants/theme";

const PICKER_OPTIONS = [
  { label: "Ahorros", value: "ahorros" },
  { label: "Herencia", value: "herencia" },
  { label: "Venta de inmuebles", value: "venta_inmuebles" },
  { label: "Otros", value: "otros" },
];

export default function HomeScreen() {
  const [checked, setChecked] = useState(false);
  const [checkedWithLabel, setCheckedWithLabel] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState("ahorros");

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="p-base gap-xl"
    >
      <Section title="Button">
        <Button label="Continuar" />
        <Button label="Continuar" disabled />
        <Button label="Agregar" variant="secondary" />
      </Section>
      <Section title="Input">
        <Input label="Label" placeholder="Placeholder" />
        <Input label="Contraseña" placeholder="Placeholder" isPassword />
        <Input
          label="Con error"
          placeholder="Placeholder"
          error="Este campo es requerido"
        />
      </Section>
      <Section title="Checkbox">
        <View className="flex-row gap-xl">
          <Checkbox checked={false} onPress={() => {}} />
          <Checkbox checked={false} onPress={() => {}} label="Text" />
        </View>
        <View className="flex-row gap-xl">
          <Checkbox checked={checked} onPress={() => setChecked((p) => !p)} />
          <Checkbox
            checked={checkedWithLabel}
            onPress={() => setCheckedWithLabel((p) => !p)}
            label="Text"
          />
        </View>
      </Section>
      <Section title="Highlight">
        <Highlight
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus mauris non elementum."
          variant="info"
        />
        <Highlight
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus mauris non elementum."
          variant="warning"
        />
      </Section>
      <Section title="BottomSheet">
        <Button
          label="Abrir BottomSheet"
          onPress={() => setBottomSheetVisible(true)}
        />
        <BottomSheet
          visible={bottomSheetVisible}
          icon={
            <Ionicons
              name="receipt-outline"
              size={48}
              color={Colors.secondary}
            />
          }
          title="¿Lorem ipsum dolor sit amet, consectetur adipiscing elit.?"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus mauris non elementum."
          confirmLabel="Agregar"
          onConfirm={() => setBottomSheetVisible(false)}
          onCancel={() => setBottomSheetVisible(false)}
        />
      </Section>
      <Section title="Picker">
        <Text className="font-regular text-sm text-gray-60">
          Seleccionado:{" "}
          {PICKER_OPTIONS.find((o) => o.value === pickerValue)?.label}
        </Text>
        <Button label="Abrir Picker" onPress={() => setPickerVisible(true)} />
        <Picker
          visible={pickerVisible}
          options={PICKER_OPTIONS}
          selectedValue={pickerValue}
          onValueChange={setPickerValue}
          onAccept={() => setPickerVisible(false)}
          onCancel={() => setPickerVisible(false)}
        />
      </Section>
    </ScrollView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="gap-sm">
      <Text className="font-bold text-lg text-secondary">{title}</Text>
      <View className="gap-sm">{children}</View>
    </View>
  );
}
