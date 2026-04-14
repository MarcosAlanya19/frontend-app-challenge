import { AttachVoucher } from "@/modules/transactions/components/attach-voucher";
import { useTransactionSubmitFlow } from "@/modules/transactions/hooks/use-transaction-submit-flow";
import { ITransactionForm } from "@/modules/transactions/types/ITransactionForm.type";
import { useFormContext } from "react-hook-form";

export default function AttachVoucherScreen() {
  const { handleSubmit } = useFormContext<ITransactionForm>();
  const { handleFinishTransaction, isLoading } = useTransactionSubmitFlow();

  const onSubmit = handleSubmit(handleFinishTransaction);

  return <AttachVoucher onSubmit={onSubmit} isLoading={isLoading} />;
}
