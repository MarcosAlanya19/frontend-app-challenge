import { Button } from "@/components/ui/button";
import { AppText } from "@/components/ui/text";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/use-auth-store";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { currentUser, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace(ROUTES.auth);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-base pt-xl gap-xl">
        <AppText size="xl" weight="bold">
          Perfil
        </AppText>

        {currentUser && (
          <View className="gap-xs">
            <AppText size="sm" color="gray-40">
              Nombre
            </AppText>
            <AppText size="base" weight="medium">
              {currentUser.fullName}
            </AppText>
            {currentUser.email && (
              <>
                <AppText size="sm" color="gray-40" className="mt-sm">
                  Correo
                </AppText>
                <AppText size="base" weight="medium">
                  {currentUser.email}
                </AppText>
              </>
            )}
          </View>
        )}

        <View style={{ marginTop: "auto" }} className="pb-xl">
          <Button label="Cerrar sesión" onPress={handleLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
}
