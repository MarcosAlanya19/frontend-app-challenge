export enum ECurrency {
  USD = "USD",
  PEN = "PEN",
}

export const CURRENCY_LABEL: Record<ECurrency, string> = {
  [ECurrency.USD]: "Dólares",
  [ECurrency.PEN]: "Soles",
};

export const CURRENCY_SYMBOL: Record<ECurrency, string> = {
  [ECurrency.USD]: "$",
  [ECurrency.PEN]: "S/",
};
