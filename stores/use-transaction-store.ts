import { BankAccount, TransactionSummary } from "@/modules/transactions/types";
import { create } from "zustand";

interface TransactionStore {
  summary: TransactionSummary | null;
  sourceBankId: string;
  destinationAccount: BankAccount | null;
  sourceFundId: string;
  setSummary: (summary: TransactionSummary) => void;
  setSourceBankId: (id: string) => void;
  setDestinationAccount: (account: BankAccount) => void;
  setSourceFundId: (id: string) => void;
  reset: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  summary: null,
  sourceBankId: "",
  destinationAccount: null,
  sourceFundId: "",
  setSummary: (summary) => set({ summary }),
  setSourceBankId: (id) => set({ sourceBankId: id }),
  setDestinationAccount: (account) => set({ destinationAccount: account }),
  setSourceFundId: (id) => set({ sourceFundId: id }),
  reset: () =>
    set({
      summary: null,
      sourceBankId: "",
      destinationAccount: null,
      sourceFundId: "",
    }),
}));
