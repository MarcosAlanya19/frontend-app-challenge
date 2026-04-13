import { IExchangeRate } from "@/modules/home/types/IExchangeRate.type";
import { create } from "zustand";

interface ExchangeRateStore {
  rates: IExchangeRate | null;
  setRates: (rates: IExchangeRate) => void;
}

export const useExchangeRateStore = create<ExchangeRateStore>((set) => ({
  rates: null,
  setRates: (rates) => set({ rates }),
}));
