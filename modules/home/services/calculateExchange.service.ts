import { api } from "@/lib/axios";
import { ICalculateExchangeRate } from "../types/ICalculateExchange.type";

export interface ICalculateExchangeParams {
  originCurrency: string;
  destinationCurrency: string;
  amount: number;
}

export interface ICalculateExchange {
  params: ICalculateExchangeParams;
}

export const calculateExchange = ({ params }: ICalculateExchange) =>
  api.get<ICalculateExchangeRate>("/exchange/calculates", {
    params: {
      originCurrency: params.originCurrency,
      destinationCurrency: params.destinationCurrency,
      amount: params.amount,
      active: "S",
    },
  });
