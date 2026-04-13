import { formatMoney, money, parseMoney } from "@/lib/currency";

export function getBankRate(rate: number, isCompra: boolean): number {
  return isCompra ? rate * 0.982 : rate * 1.02;
}

export function calcReceiveAmount(
  amount: number,
  rate: number,
  isCompra: boolean,
): string {
  if (!amount) return "0.00";
  const result = isCompra
    ? money(amount).multiply(rate)
    : money(amount).divide(rate);
  return formatMoney(result.value);
}

export function calcSavings(
  amount: number,
  rate: number,
  bankRate: number,
  isCompra: boolean,
): string {
  if (!amount) return "0.00";
  const result = isCompra
    ? money(rate).subtract(bankRate).multiply(amount)
    : money(bankRate)
        .subtract(rate)
        .multiply(money(amount).divide(rate).value);
  return formatMoney(result.value);
}

export function calcKoins(
  amount: number,
  rate: number,
  isCompra: boolean,
): number {
  if (!amount) return 0;
  return isCompra
    ? Math.floor(money(amount).value)
    : Math.floor(money(amount).divide(rate).value);
}

export { parseMoney as parseAmount };
