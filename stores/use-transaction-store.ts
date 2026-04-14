import { BankAccount, ITransactionSummary } from "@/modules/transactions/types";
import { MOCK_ACCOUNTS } from "@/modules/transactions/constants/mock-accounts";
import { create } from "zustand";

interface TransactionStore {
  summary: ITransactionSummary | null;
  sourceBankId: string;
  destinationAccount: BankAccount | null;
  sourceFundId: string;
  accounts: BankAccount[];
  setSummary: (summary: ITransactionSummary) => void;
  setSourceBankId: (id: string) => void;
  setDestinationAccount: (account: BankAccount) => void;
  setSourceFundId: (id: string) => void;
  addAccount: (account: BankAccount) => void;
  reset: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  summary: null,
  sourceBankId: "",
  destinationAccount: null,
  sourceFundId: "",
  accounts: MOCK_ACCOUNTS,
  setSummary: (summary) => set({ summary }),
  setSourceBankId: (id) => set({ sourceBankId: id }),
  setDestinationAccount: (account) => set({ destinationAccount: account }),
  setSourceFundId: (id) => set({ sourceFundId: id }),
  addAccount: (account) =>
    set((state) => ({ accounts: [...state.accounts, account] })),
  reset: () =>
    set({
      summary: null,
      sourceBankId: "",
      destinationAccount: null,
      sourceFundId: "",
    }),
}));
