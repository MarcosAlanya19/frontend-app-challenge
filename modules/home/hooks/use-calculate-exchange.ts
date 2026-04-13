import { useCustomMutation } from "@/hooks/use-custom-mutation";
import {
  ICalculateExchange,
  calculateExchange,
} from "../services/calculateExchange.service";
import { ICalculateExchangeRate } from "../types/ICalculateExchange.type";

export const useCalculateExchange = () => {
  return useCustomMutation<ICalculateExchangeRate, ICalculateExchange>({
    mutationFn: (vars) => calculateExchange(vars).then(({ data }) => data),
  });
};
