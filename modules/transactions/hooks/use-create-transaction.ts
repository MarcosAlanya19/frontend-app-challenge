import { useCustomMutation } from "@/hooks/use-custom-mutation";
import {
  ICreateTransaction,
  ICreateTransactionResponse,
  createTransaction,
} from "../services/createTransaction.service";

export const useCreateTransaction = () => {
  return useCustomMutation<ICreateTransactionResponse, ICreateTransaction>({
    mutationFn: (vars) => createTransaction(vars).then(({ data }) => data),
  });
};
