import { TransactionNavigator } from "@/modules/transactions/components/transaction-navigator";
import { ITransactionForm } from "@/modules/transactions/types/ITransactionForm.type";
import { FormProvider, useForm } from "react-hook-form";

export default function TransactionsLayout() {
  const methods = useForm<ITransactionForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      sourceBankId: "",
      destinationAccountId: "",
      sourceFundId: "",
      fileName: "",
      fileUri: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <TransactionNavigator />
    </FormProvider>
  );
}
