import { useCustomMutation } from "@/hooks/use-custom-mutation";
import { ILogin, login } from "../services/login.service";

export const useLogin = () => {
  return useCustomMutation<boolean, ILogin>({
    mutationFn: login,
  });
};
