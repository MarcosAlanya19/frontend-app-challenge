import { useAuthStore } from "@/stores/use-auth-store";
import { Redirect } from "expo-router";

export default function Index() {
  const { currentUser } = useAuthStore();

  return <Redirect href={currentUser ? "/(tabs)" : "/(auth)"} />;
}
