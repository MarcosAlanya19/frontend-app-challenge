import { getUpdateTime } from "@/lib/date";
import { TransferData } from "@/modules/transactions/components/transfer-data";
import { KAMBISTA_ACCOUNT } from "@/modules/transactions/constants/kambista-account";
import { useTransactionStore } from "@/stores/use-transaction-store";
import { router } from "expo-router";

export default function TransferDataScreen() {
  const { summary } = useTransactionStore();

  const details = {
    ...KAMBISTA_ACCOUNT,
    amount: summary ? `S/ ${summary.receiveAmount}` : KAMBISTA_ACCOUNT.amount,
  };

  const handleConfirm = () => {
    router.push("/(transactions)/attach-voucher");
  };

  return (
    <TransferData
      details={details}
      updateTime={getUpdateTime()}
      onConfirm={handleConfirm}
    />
  );
}
