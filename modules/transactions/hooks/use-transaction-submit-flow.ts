import { useTransactionStore } from "@/stores/use-transaction-store";
import { router } from "expo-router";
import { ITransactionForm } from "../types/ITransactionForm.type";
import { useCreateTransaction } from "./use-create-transaction";
import { useSubmitVoucher } from "./use-submit-voucher";

export function useTransactionSubmitFlow() {
  const createTransaction = useCreateTransaction();
  const submitVoucher = useSubmitVoucher();
  const { summary, sourceBankId, destinationAccount, sourceFundId } =
    useTransactionStore();

  const handleFinishTransaction = async (data: ITransactionForm) => {
    console.log("Finishing Transaction with data:", data);
    if (!summary || !destinationAccount) {
      console.log("Missing summary or destinationAccount:", {
        summary,
        destinationAccount,
      });
      return;
    }

    try {
      const transaction = await createTransaction.handle({
        payload: {
          summary,
          sourceBankId,
          destinationAccountId: destinationAccount.id,
          sourceFundId,
        },
      });

      console.log("Transaction created:", transaction);

      if (!transaction) return;

      const result = await submitVoucher.handle({
        payload: {
          transactionId: transaction.transactionId,
          fileName: data.fileName,
          fileUri: data.fileUri,
        },
      });

      console.log("Voucher submitted:", result);

      router.push("/(transactions)/created");
    } catch (error) {
      console.error("Error in handleFinishTransaction:", error);
    }
  };

  return {
    handleFinishTransaction,
    isLoading: createTransaction.isLoading || submitVoucher.isLoading,
  };
}
