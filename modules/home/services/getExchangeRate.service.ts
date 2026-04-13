import { api } from "@/lib/axios";
import { IExchangeRate } from "../types/IExchangeRate.type";

export const getExchangeRate = () => {
  return api.get<IExchangeRate>("/exchange/kambista/current");
};
