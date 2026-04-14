import { ECurrency } from "@/enums/currency";
import { ITransactionSummary } from "../types";

export const DEFAULT_SUMMARY: ITransactionSummary = {
  sendAmount: "100.00",
  receiveAmount: "343.00",
  sendCurrency: ECurrency.USD,
  receiveCurrency: ECurrency.PEN,
  coupon: "MICASA21",
  buyRate: 3.422,
  sellRate: 3.433,
};
