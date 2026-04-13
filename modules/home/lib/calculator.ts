import { money, parseMoney } from "@/lib/currency";

export const calcKoins = (
  amount: number,
  rate: number,
  isCompra: boolean,
): number => {
  if (!amount) return 0;
  return isCompra
    ? Math.floor(money(amount).value)
    : Math.floor(money(amount).divide(rate).value);
};

export { parseMoney as parseAmount };
