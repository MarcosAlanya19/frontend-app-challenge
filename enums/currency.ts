export enum Currency {
  USD = "USD",
  PEN = "PEN",
}

export const CURRENCY_LABEL: Record<Currency, string> = {
  [Currency.USD]: "Dólares",
  [Currency.PEN]: "Soles",
};
