import { FileUploadUI } from "@/components/ui/file-upload";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

interface FormFileUploadProps<T extends FieldValues> extends Omit<
  UseControllerProps<T>,
  "control"
> {
  uriName: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
}

export function FileUpload<T extends FieldValues>({
  name,
  uriName,
  label,
  placeholder,
  helperText,
  rules,
}: FormFileUploadProps<T>) {
  const { control } = useFormContext<T>();
  const {
    field: { onChange: onChangeName, value: fileName },
    fieldState: { error: nameError },
  } = useController({
    name,
    control,
    rules: { required: "Este campo es requerido", ...rules },
  });

  const {
    field: { onChange: onChangeUri },
    fieldState: { error: uriError },
  } = useController({
    name: uriName as any,
    control,
    rules: { required: true },
  });

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf", "application/msword"],
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets[0]) {
      onChangeName(result.assets[0].name);
      onChangeUri(result.assets[0].uri);
    }
  };

  const error =
    nameError?.message ||
    (uriError ? "Selecciona un archivo válido" : undefined);

  return (
    <FileUploadUI
      label={label}
      value={fileName}
      placeholder={placeholder}
      onPress={handlePickFile}
      helperText={helperText}
      error={error}
    />
  );
}
