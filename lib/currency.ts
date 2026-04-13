import currency from "currency.js";

export const money = (value: number | string) => currency(value);

export const formatMoney = (value: number | string): string =>
  money(value).format({ symbol: "" }).trim();

export const parseMoney = (value: string): number => {
  const n = money(value).value;
  return isNaN(n) ? 0 : n;
};
