import { findUserByCredentials } from "@/mocks/mock-db";
import { useAuthStore } from "@/stores/use-auth-store";

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
  if (user) {
    const { password: _pw, ...authUser } = user;
    useAuthStore.getState().setCurrentUser(authUser);
    return true;
  }
  return false;
};
