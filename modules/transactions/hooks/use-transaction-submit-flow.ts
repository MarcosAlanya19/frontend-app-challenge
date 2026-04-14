import { useTransactionStore } from "@/stores/use-transaction-store";
import { router } from "expo-router";
import { ITransactionForm } from "../types/ITransactionForm.type";
import { useCreateTransaction } from "./use-create-transaction";
import { useSubmitVoucher } from "./use-submit-voucher";

export function useTransactionSubmitFlow() {
  const createTransaction = useCreateTransaction();
  const submitVoucher = useSubmitVoucher();
  const { summary, sourceBankId, destinationAccount, sourceFundId, setTransactionId } =
    useTransactionStore();

  const handleFinishTransaction = async (data: ITransactionForm) => {
    if (!summary || !destinationAccount) return;

    try {
      const transaction = await createTransaction.handle({
        payload: {
          summary,
          sourceBankId,
          destinationAccountId: destinationAccount.id,
          sourceFundId,
        },
      });

      if (!transaction) return;

      setTransactionId(transaction.transactionId);

      await submitVoucher.handle({
        payload: {
          transactionId: transaction.transactionId,
          fileName: data.fileName,
          fileUri: data.fileUri,
        },
      });

      router.push("/(transactions)/created");
    } catch {
      // handled by useCustomMutation onError
    }
  };

  return {
    handleFinishTransaction,
    isLoading: createTransaction.isLoading || submitVoucher.isLoading,
  };
}
