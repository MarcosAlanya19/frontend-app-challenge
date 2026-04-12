import { getAge, isValidDate } from "@/lib/date";
import { z } from "zod";
import { EDocumentType } from "../enums/document-type.enum";

const documentNumberRules: Record<EDocumentType, (n: string) => string | null> =
  {
    [EDocumentType.DNI]: (n) =>
      /^\d{8}$/.test(n) ? null : "8 dígitos requeridos",
    [EDocumentType.CE]: (n) =>
      /^\d{9}$/.test(n) ? null : "9 dígitos requeridos",
    [EDocumentType.PASAPORTE]: (n) =>
      n.length >= 8 && n.length <= 15 ? null : "Entre 8 y 15 caracteres",
  };

const validateDocumentNumber = (
  documentType: string,
  documentNumber: string,
  ctx: z.RefinementCtx,
) => {
  const rule = documentNumberRules[documentType as EDocumentType];
  if (!rule) return;

  const error = rule(documentNumber);
  if (!error) return;

  ctx.addIssue({ code: "custom", message: error, path: ["documentNumber"] });
};

export const personalDataSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Requerido")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras y espacios"),
    documentType: z.string().min(1, "Requerido"),
    documentNumber: z.string().min(1, "Requerido"),
    phone: z.string().regex(/^\d{9}$/, "9 dígitos requeridos"),
    birthDate: z
      .string()
      .min(1, "Requerido")
      .refine(isValidDate, "Fecha inválida")
      .refine((v) => getAge(v) >= 18, "Debes ser mayor de edad"),
    previousExchange: z.string().optional(),
    termsAccepted: z.boolean().refine((v) => v, "Requerido"),
    privacyAccepted: z.boolean().refine((v) => v, "Requerido"),
  })
  .superRefine(({ documentType, documentNumber }, ctx) => {
    validateDocumentNumber(documentType, documentNumber, ctx);
  });

export type PersonalDataFormData = z.infer<typeof personalDataSchema>;
