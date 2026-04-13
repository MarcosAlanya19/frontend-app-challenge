import {
  existsByDocument,
  existsByEmail,
  existsByPhone,
  saveUser,
} from "@/mocks/mock-db";
import { APIError } from "@/types";
import { generateEmail } from "../lib/generateEmail";

export interface IRegisterPayload {
  fullName: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  birthDate: string;
}

export interface IRegister {
  payload: IRegisterPayload;
}

const MOCK_PASSWORD = "123456";

export const register = async ({ payload }: IRegister): Promise<string> => {
  const documentExists = await existsByDocument(
    payload.documentType,
    payload.documentNumber,
  );

  if (documentExists) {
    throw {
      success: false,
      data: {
        name: "DUPLICATE_DNI" as const,
        title: "Documento en uso",
        message: "El número de documento registrado ya está en uso.",
      },
    } satisfies APIError;
  }

  const phoneExists = await existsByPhone(payload.phone);
  if (phoneExists) {
    throw {
      success: false,
      data: {
        name: "DUPLICATE_PHONE" as const,
        title: "Teléfono en uso",
        message: "El número de teléfono registrado ya está en uso.",
      },
    } satisfies APIError;
  }

  const email = generateEmail(payload.fullName);

  const emailExists = await existsByEmail(email);
  if (emailExists) {
    throw {
      success: false,
      data: {
        name: "DUPLICATE_EMAIL" as const,
        title: "Correo en uso",
        message:
          "El correo generado ya está en uso. Intenta con un nombre diferente.",
      },
    } satisfies APIError;
  }

  await saveUser({
    email,
    password: MOCK_PASSWORD,
    fullName: payload.fullName,
    documentType: payload.documentType,
    documentNumber: payload.documentNumber,
    phone: payload.phone,
    birthDate: payload.birthDate,
  });

  return email;
};
