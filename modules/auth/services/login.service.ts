import { findUserByCredentials } from "@/mocks/mock-db";
import { useAuthStore } from "@/stores/use-auth-store";
import { APIError } from "@/types";

export interface ILoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ILogin {
  payload: ILoginPayload;
}

export const login = async ({ payload }: ILogin): Promise<boolean> => {
  const user = await findUserByCredentials(payload.email, payload.password);
  if (!user) {
    throw {
      success: false,
      data: {
        name: "INVALID_CREDENTIALS",
        title: "Credenciales inválidas",
        message: "El correo o la contraseña son incorrectos.",
      },
    } satisfies APIError;
  }
  const { password: _pw, ...authUser } = user;
  useAuthStore.getState().setCurrentUser(authUser);
  return true;
};
