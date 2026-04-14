import banks from "@/mocks/bankAccounts.json";
import sourceFunds from "@/mocks/sourceFunds.json";
import { AddAccountModal } from "@/modules/transactions/components/add-account-modal";
import { CreateTransaction } from "@/modules/transactions/components/create-transaction";
import { DEFAULT_SUMMARY } from "@/modules/transactions/constants/default-summary";
import { Bank, SourceFund } from "@/modules/transactions/types";
import { ITransactionForm } from "@/modules/transactions/types/ITransactionForm.type";
import { useTransactionStore } from "@/stores/use-transaction-store";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CreateTransactionScreen() {
  const { summary, accounts, addAccount } = useTransactionStore();
  const { getValues } = useFormContext<ITransactionForm>();
  const [addAccountVisible, setAddAccountVisible] = useState(false);

  const bankOptions = useMemo(
    () => (banks as Bank[]).map((b) => ({ label: b.name, value: b.id })),
    [],
  );

  const accountOptions = useMemo(
    () =>
      accounts.map((a) => ({
        label: `${a.alias} - ${a.bankName} - ${a.currency}`,
        subtitle: a.accountNumber,
        value: a.id,
      })),
    [accounts],
  );

  const fundOptions = useMemo(
    () =>
      (sourceFunds as SourceFund[]).map((f) => ({
        label: f.name,
        value: f._id,
      })),
    [],
  );

  const handleContinue = () => {
    const { sourceBankId, destinationAccountId, sourceFundId } = getValues();
    const store = useTransactionStore.getState();
    store.setSourceBankId(sourceBankId);
    store.setDestinationAccount(
      accounts.find((a) => a.id === destinationAccountId)!,
    );
    store.setSourceFundId(sourceFundId);
    router.push("/(transactions)/transfer-data");
  };

  return (
    <>
      <CreateTransaction
        summary={summary ?? DEFAULT_SUMMARY}
        bankOptions={bankOptions}
        accountOptions={accountOptions}
        fundOptions={fundOptions}
        onContinue={handleContinue}
        onAddAccount={() => setAddAccountVisible(true)}
      />
      <AddAccountModal
        visible={addAccountVisible}
        onClose={() => setAddAccountVisible(false)}
        onSave={(account) => {
          const bankName =
            (banks as Bank[]).find((b) => b.id === account.bankId)?.name ?? "";
          addAccount({
            id: Date.now().toString(),
            bankId: account.bankId,
            bankName,
            alias: account.alias,
            accountNumber: account.accountNumber,
            currency: account.currency,
            type: account.accountType,
          });
          setAddAccountVisible(false);
        }}
      />
    </>
  );
}
