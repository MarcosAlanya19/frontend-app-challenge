import { AppText } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";

export const DiscountsBanner = () => {
  return (
    <LinearGradient
      colors={["#B28FD9", "#F0979E", "#FCC48C"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      className="mt-xl mx-base rounded-xl overflow-hidden"
      style={{
        height: 100,
        justifyContent: "center",
      }}
    >
      <Image
        source={require("@/assets/images/piggy-glasses.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          left: -40,
          bottom: -25,
          width: 110,
          height: 110,
          transform: [{ rotate: "-300deg" }],
          zIndex: 2,
        }}
      />

      <Image
        source={require("@/assets/images/gift.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          right: -25,
          bottom: -20,
          width: 95,
          height: 95,
          transform: [{ rotate: "340deg" }],
          zIndex: 2,
        }}
      />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <AppText size="md" weight="bold" color="secondary">
            Disfruta de
          </AppText>

          <View
            style={{
              backgroundColor: "#F5C842",
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
          >
            <AppText size="md" weight="bold" color="secondary">
              descuentos
            </AppText>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <AppText size="md" weight="bold" color="secondary">
            en los
          </AppText>

          <AppText size="md" weight="bold" style={{ color: "#FFEAE5" }}>
            mejores comercios
          </AppText>
        </View>
      </View>
    </LinearGradient>
  );
};
