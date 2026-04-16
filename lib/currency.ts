import currency from "currency.js";

export const money = (value: number | string) => currency(value);

export const formatMoney = (value: number | string): string =>
  money(value).format({ symbol: "" }).trim();

export const parseMoney = (value: string): number => {
  const n = money(value).value;
  return isNaN(n) ? 0 : n;
};

export const formatRate = (value: number | string): string =>
  money(value).format({ symbol: "", precision: 3 }).trim();

export const formatKoins = (value: number): string =>
  money(value).format({ symbol: "", precision: 0 }).trim();
