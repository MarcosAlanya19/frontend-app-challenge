export enum ECurrency {
  USD = "USD",
  PEN = "PEN",
}

export const CURRENCY_LABEL: Record<ECurrency, string> = {
  [ECurrency.USD]: "Dólares",
  [ECurrency.PEN]: "Soles",
};
