interface IData {
  operate: boolean;
  msg: string;
}

interface ISavings {
  amount: string;
  currency: string;
}

interface ITc {
  bid: number;
  ask: number;
}

export interface ICalculateExchangeRate {
  rate: number;
  exchange: number;
  tc: ITc;
  data: IData;
  savings: ISavings;
}
