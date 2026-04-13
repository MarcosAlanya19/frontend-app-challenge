import { LogoSVG } from "@/components/icons/logo-svg";
import { Button } from "@/components/ui/button";
import { EActiveField } from "@/enums/active-field";
import { ECurrency } from "@/enums/currency";
import { ERateType } from "@/enums/rate-type";
import { useDebounce } from "@/hooks/use-debounce";
import { calcKoins, parseAmount } from "@/modules/home/lib/calculator";
import { IExchangeRate } from "@/modules/home/types/IExchangeRate.type";
import { TransactionSummary } from "@/modules/transactions/types";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalculatorInput } from "./calculator-input";
import { CouponInput } from "./coupon-input";
import { PromoBanner } from "./promo-banner";
import { RateTabs } from "./rate-tabs";
import { SavingsRow } from "./savings-row";

type TransactionData = Omit<TransactionSummary, "buyRate" | "sellRate">;

interface CalculatorProps {
  exchangeRateData: IExchangeRate | undefined;
  isLoading: boolean;
  isCalculating: boolean;
  onCalculate: (
    value: string,
    field: EActiveField,
    isBuy: boolean,
  ) => Promise<{ exchange: string; savings: string } | undefined>;
  onStartTransaction: (data: TransactionData) => void;
}

export function Calculator({
  exchangeRateData,
  isLoading,
  isCalculating,
  onCalculate,
  onStartTransaction,
}: CalculatorProps) {
  const [rateType, setRateType] = useState<ERateType>(ERateType.BUY);
  const [lastActiveField, setLastActiveField] = useState<EActiveField>(
    EActiveField.SEND,
  );
  const [sendAmount, setSendAmount] = useState("1000");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [savings, setSavings] = useState("0.00");
  const [coupon, setCoupon] = useState("");

  const isBuy = rateType === ERateType.BUY;
  const sendCurrency = isBuy ? ECurrency.PEN : ECurrency.USD;
  const receiveCurrency = isBuy ? ECurrency.USD : ECurrency.PEN;
  const rate = (isBuy ? exchangeRateData?.bid : exchangeRateData?.ask) ?? 0;
  const koins = calcKoins(parseAmount(sendAmount), rate, isBuy);

  const performCalculate = async (
    value: string,
    field: EActiveField,
    isBuyValue: boolean,
  ) => {
    const parsed = parseAmount(value);
    if (!parsed) {
      if (field === EActiveField.SEND) setReceiveAmount("0.00");
      else setSendAmount("0.00");
      return;
    }

    const result = await onCalculate(value, field, isBuyValue);
    if (!result) return;

    if (field === EActiveField.SEND) setReceiveAmount(result.exchange);
    else setSendAmount(result.exchange);
    setSavings(result.savings);
  };

  const debouncedCalculate = useDebounce(performCalculate, 500);

  useEffect(() => {
    performCalculate("1000", EActiveField.SEND, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendAmountChange = (value: string) => {
    setSendAmount(value);
    setLastActiveField(EActiveField.SEND);
    debouncedCalculate(value, EActiveField.SEND, isBuy);
  };

  const handleReceiveAmountChange = (value: string) => {
    setReceiveAmount(value);
    setLastActiveField(EActiveField.RECEIVE);
    debouncedCalculate(value, EActiveField.RECEIVE, isBuy);
  };

  const handleSwap = () => {
    const newIsBuy = !isBuy;
    setRateType(newIsBuy ? ERateType.BUY : ERateType.SELL);
    const currentValue =
      lastActiveField === EActiveField.SEND ? sendAmount : receiveAmount;
    if (parseAmount(currentValue)) {
      performCalculate(currentValue, lastActiveField, newIsBuy);
    }
  };

  const handleStartTransaction = () => {
    onStartTransaction({
      sendAmount,
      receiveAmount,
      sendCurrency,
      receiveCurrency,
      coupon,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-10">
      <View className="items-center pt-base pb-14">
        <LogoSVG height={31} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-base pb-xl"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="bg-white rounded-md"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <RateTabs
            buyRate={exchangeRateData?.bid ?? 0}
            sellRate={exchangeRateData?.ask ?? 0}
            isLoading={isLoading}
            rateType={rateType}
            onRateTypeChange={setRateType}
          />

          <CalculatorInput
            sendCurrency={sendCurrency}
            receiveCurrency={receiveCurrency}
            sendAmount={sendAmount}
            receiveAmount={receiveAmount}
            onSendAmountChange={handleSendAmountChange}
            onReceiveAmountChange={handleReceiveAmountChange}
            isSendCalculating={
              isCalculating && lastActiveField === EActiveField.RECEIVE
            }
            isReceiveCalculating={
              isCalculating && lastActiveField === EActiveField.SEND
            }
            onSwap={handleSwap}
          />

          <SavingsRow savings={savings} koins={koins} />

          <CouponInput value={coupon} onChange={setCoupon} onApply={() => {}} />

          <PromoBanner />
        </View>

        <View className="mt-4">
          <Button label="Iniciar operación" onPress={handleStartTransaction} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
