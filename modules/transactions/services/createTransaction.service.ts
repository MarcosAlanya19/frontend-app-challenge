import { ITransactionSummary } from "../types";

export interface ICreateTransactionPayload {
  summary: ITransactionSummary;
  sourceBankId: string;
  destinationAccountId: string;
  sourceFundId: string;
}

export interface ICreateTransaction {
  payload: ICreateTransactionPayload;
}

export interface ICreateTransactionResponse {
  transactionId: string;
}

export const createTransaction = (
  _: ICreateTransaction,
): Promise<{ data: ICreateTransactionResponse }> =>
  Promise.resolve({ data: { transactionId: "mock-tx-123" } });
