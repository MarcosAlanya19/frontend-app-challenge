import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Formato de correo no válido"),
  password: z.string().min(1, "La contraseña es requerida"),
  rememberMe: z.boolean().optional(),
});

export type ILoginFormData = z.infer<typeof loginSchema>;
