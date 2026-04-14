import { ECurrency } from "@/enums/currency";

export interface Bank {
  id: string;
  name: string;
  alias: string;
}

export interface SourceFund {
  _id: string;
  name: string;
}

export interface BankAccount {
  id: string;
  bankId: string;
  bankName: string;
  alias: string;
  accountNumber: string;
  currency: string;
  type: string;
}

export interface ITransactionSummary {
  sendAmount: string;
  receiveAmount: string;
  sendCurrency: ECurrency;
  receiveCurrency: ECurrency;
  coupon: string;
  buyRate: number;
  sellRate: number;
}

export interface TransferDetails {
  bankName: string;
  amount: string;
  accountNumber: string;
  ruc: string;
  holder: string;
  accountType: string;
}
