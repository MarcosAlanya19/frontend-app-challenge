import { LoginFormData } from "../schemas/login.schema";

export async function login(_data: LoginFormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
}
