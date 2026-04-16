import { ROUTES } from "@/constants/routes";
import { TransactionCreated } from "@/modules/transactions/components/transaction-created";
import { useTransactionStore } from "@/stores/use-transaction-store";
import { router } from "expo-router";

export default function TransactionCreatedScreen() {
  const { summary, transactionId, reset } = useTransactionStore();

  const receiveAmount = summary?.receiveAmount ?? "-";

  const handleGoHome = () => {
    reset();
    router.replace(ROUTES.tabs);
  };

  return (
    <TransactionCreated receiveAmount={receiveAmount} transactionId={transactionId ?? "-"} onGoHome={handleGoHome} />
  );
}
