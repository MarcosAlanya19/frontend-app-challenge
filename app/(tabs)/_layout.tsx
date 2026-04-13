import { CardSvg } from "@/components/icons/card-svg";
import { ExchangeSvg } from "@/components/icons/exchange-svg";
import { MoneySvg } from "@/components/icons/money-svg";
import { PersonSvg } from "@/components/icons/person-svg";
import { RecordDocumentSvg } from "@/components/icons/record-document-svg";
import { Colors } from "@/constants/theme";
import { Tabs } from "expo-router";

type TabConfig = {
  name: string;
  title: string;
  icon: React.ComponentType<{ color: string }>;
};

const TABS: TabConfig[] = [
  { name: "index", title: "Inicio", icon: ExchangeSvg },
  { name: "history", title: "Historial", icon: RecordDocumentSvg },
  { name: "accounts", title: "Cuentas", icon: CardSvg },
  { name: "koinks", title: "Koinks", icon: MoneySvg },
  { name: "profile", title: "Perfil", icon: PersonSvg },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.gray40,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.gray21,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: "Montserrat_500Medium",
          fontSize: 11,
        },
      }}
    >
      {TABS.map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => <Icon color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
