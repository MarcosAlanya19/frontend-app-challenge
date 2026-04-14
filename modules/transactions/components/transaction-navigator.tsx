import { Header } from "@/components/ui/header";
import { Stack, router } from "expo-router";

export const TransactionNavigator = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          header: () => (
            <Header title="Completa los datos" onBack={() => router.back()} />
          ),
        }}
      />

      <Stack.Screen
        name="transfer-data"
        options={{
          header: () => (
            <Header
              title="Transfiere a Kambista"
              onBack={() => router.back()}
            />
          ),
        }}
      />

      <Stack.Screen
        name="attach-voucher"
        options={{
          header: () => (
            <Header title="Envía tu constancia" onBack={() => router.back()} />
          ),
        }}
      />

      <Stack.Screen
        name="created"
        options={{
          header: () => <Header title="" />,
        }}
      />
    </Stack>
  );
};
