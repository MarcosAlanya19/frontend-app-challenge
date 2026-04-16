import type { Href } from "expo-router";

export const ROUTES = {
  tabs: "/(tabs)" as Href,
  auth: "/(auth)" as Href,
  onboarding: {
    personalData: "/(onboarding)/personal-data" as Href,
    success: "/(onboarding)/success" as const,
  },
  transactions: {
    create: "/(transactions)/create" as Href,
    transferData: "/(transactions)/transfer-data" as Href,
    attachVoucher: "/(transactions)/attach-voucher" as Href,
    created: "/(transactions)/created" as Href,
  },
} as const;
