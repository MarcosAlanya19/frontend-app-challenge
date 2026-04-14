import { ECurrency } from "@/enums/currency";
import { z } from "zod";

export const addAccountSchema = z.object({
  accountType: z.string().min(1, "Selecciona un tipo de cuenta"),
  bankId: z.string().min(1, "Selecciona una entidad financiera"),
  currency: z.enum([ECurrency.PEN, ECurrency.USD]),
  accountNumber: z
    .string()
    .min(1, "Ingresa el número de cuenta")
    .regex(/^\d+$/, "Solo se permiten dígitos"),
  alias: z.string().min(1, "Ingresa un alias para tu cuenta"),
  declared: z.literal(true, "Debes declarar que la cuenta es tuya"),
});

export type AddAccountFormValues = z.infer<typeof addAccountSchema>;
