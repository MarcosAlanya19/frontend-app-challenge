import { useCustomMutation } from "@/hooks/use-custom-mutation";
import {
  ISubmitVoucher,
  ISubmitVoucherResponse,
  submitVoucher,
} from "../services/submitVoucher.service";

export const useSubmitVoucher = () => {
  return useCustomMutation<ISubmitVoucherResponse, ISubmitVoucher>({
    mutationFn: (vars) => submitVoucher(vars).then(({ data }) => data),
  });
};
