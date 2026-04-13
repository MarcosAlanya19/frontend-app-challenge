import { ErrorBottomSheet } from "@/components/ui/error-bottom-sheet";
import { useAuthStore } from "@/stores/use-auth-store";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";
import "../global.css";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: () => {},
  }),
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const { hasHydrated } = useAuthStore();

  if (!fontsLoaded || !hasHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(transactions)" />
        </Stack>
        <ErrorBottomSheet />
        <StatusBar style="dark" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
