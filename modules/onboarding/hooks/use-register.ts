import { useCustomMutation } from "@/hooks/use-custom-mutation";
import { IRegister, register } from "../services/register.service";

export const useRegister = () => {
  return useCustomMutation<string, IRegister>({
    mutationFn: register,
  });
};
