import { EActiveField } from "@/enums/active-field";
import { ECurrency } from "@/enums/currency";
import { formatMoney } from "@/lib/currency";
import { Calculator } from "@/modules/home/components/calculator";
import { useCalculateExchange } from "@/modules/home/hooks/use-calculate-exchange";
import { useExchangeRate } from "@/modules/home/hooks/use-exchange-rate";
import { parseAmount } from "@/modules/home/lib/calculator";
import { ITransactionSummary } from "@/modules/transactions/types";
import { useExchangeRateStore } from "@/stores/use-exchange-rate-store";
import { useTransactionStore } from "@/stores/use-transaction-store";
import { router } from "expo-router";
import { useEffect } from "react";

type TransactionData = Omit<ITransactionSummary, "buyRate" | "sellRate">;

export default function HomeScreen() {
  const { setRates } = useExchangeRateStore();
  const exchangeRate = useExchangeRate();
  const calculateExchange = useCalculateExchange();

  useEffect(() => {
    if (exchangeRate.data) setRates(exchangeRate.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRate.data]);

  const handleCalculate = async (
    value: string,
    field: EActiveField,
    isBuy: boolean,
  ): Promise<{ exchange: string; savings: string } | undefined> => {
    const origin =
      field === EActiveField.SEND
        ? isBuy
          ? ECurrency.PEN
          : ECurrency.USD
        : isBuy
          ? ECurrency.USD
          : ECurrency.PEN;
    const destination =
      field === EActiveField.SEND
        ? isBuy
          ? ECurrency.USD
          : ECurrency.PEN
        : isBuy
          ? ECurrency.PEN
          : ECurrency.USD;

    const result = await calculateExchange.handle({
      params: {
        originCurrency: origin,
        destinationCurrency: destination,
        amount: parseAmount(value) as number,
      },
    });

    if (!result?.data.operate) return undefined;

    return {
      exchange: formatMoney(result.exchange),
      savings: result.savings.amount,
    };
  };

  const handleStartTransaction = (data: TransactionData) => {
    useTransactionStore.getState().setSummary({
      ...data,
      buyRate: exchangeRate.data?.bid ?? 0,
      sellRate: exchangeRate.data?.ask ?? 0,
    });
    router.push("/(transactions)/create");
  };

  return (
    <Calculator
      exchangeRateData={exchangeRate.data}
      isLoading={exchangeRate.isLoading}
      isCalculating={calculateExchange.isLoading}
      onCalculate={handleCalculate}
      onStartTransaction={handleStartTransaction}
    />
  );
}
