import { AppText } from "@/components/ui/text";
import { Colors } from "@/constants/theme";
import { formatRate } from "@/lib/currency";
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
    <View className="mx-6 py-3.5 px-6 rounded-md overflow-hidden bg-white">
      <SummaryRow
        label="Tú envías"
        value={`${sendSymbol} ${summary.sendAmount}`}
      />
      <SummaryRow
        label="Tú recibes"
        value={`${receiveSymbol} ${summary.receiveAmount}`}
      />
      {summary.coupon ? (
        <SummaryRow label="Cupón aplicado" value={summary.coupon} />
      ) : null}

      <View
        className="flex-row justify-between items-center py-sm mt-1"
        style={{
          borderTopWidth: 1,
          borderTopColor: Colors.secondary,
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
            {formatRate(summary.buyRate)}
          </AppText>
          <AppText size="sm" weight="bold" color="secondary">
            {formatRate(summary.sellRate)}
          </AppText>
        </View>
      </View>
    </View>
  );
}
