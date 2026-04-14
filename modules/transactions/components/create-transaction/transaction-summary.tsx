import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { CURRENCY_SYMBOL } from "@/enums/currency";
import { View } from "react-native";
import { ITransactionSummary as TransactionSummaryType } from "../../types";
import { SummaryRow } from "./summary-row";

interface IProps {
  summary: TransactionSummaryType;
}

export function TransactionSummary({ summary }: IProps) {
  const sendSymbol = CURRENCY_SYMBOL[summary.sendCurrency];
  const receiveSymbol = CURRENCY_SYMBOL[summary.receiveCurrency];

  return (
    <View className="mx-6 mt-4 rounded-md overflow-hidden bg-white">
      <View className="px-base py-md">
        <SummaryRow
          label="Tú envías"
          value={`${sendSymbol} ${summary.sendAmount}`}
        />
        <SummaryRow
          label="Tú recibes"
          value={`${receiveSymbol} ${summary.receiveAmount}`}
        />
        {summary.coupon ? (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.gray25,
                marginVertical: 8,
              }}
            />
            <SummaryRow label="Cupón aplicado" value={summary.coupon} />
          </>
        ) : null}
      </View>

      <View
        className="flex-row justify-between items-center px-base py-sm"
        style={{
          borderTopWidth: summary.coupon ? 0 : 1,
          borderTopColor: Colors.gray25,
        }}
      >
        <AppText size="sm" weight="semibold" color="secondary">
          Tipo de cambio utilizado
        </AppText>
        <View className="flex-row gap-sm">
          <AppText
            size="sm"
            weight="bold"
            style={{ color: Colors.red, textDecorationLine: "line-through" }}
          >
            {summary.buyRate.toFixed(3)}
          </AppText>
          <AppText size="sm" weight="bold" color="secondary">
            {summary.sellRate.toFixed(3)}
          </AppText>
        </View>
      </View>
    </View>
  );
}
