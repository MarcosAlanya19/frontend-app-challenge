import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import {
  personalDataSchema,
  PersonalDataFormData,
} from "../schemas/personal-data.schema";
import { registerPersonalData } from "../services/onboarding.service";
import { useErrorStore } from "@/stores/use-error-store";
import { APIError } from "@/types";

export function usePersonalDataForm() {
  const form = useForm<PersonalDataFormData>({
    resolver: zodResolver(personalDataSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      documentType: "",
      documentNumber: "",
      phone: "",
      birthDate: "",
      previousExchange: "",
      termsAccepted: false,
      privacyAccepted: false,
    },
  });

  const onSubmit = async (data: PersonalDataFormData) => {
    try {
      await registerPersonalData(data);
      router.push({
        pathname: "/(onboarding)/success",
        params: { name: data.fullName.split(" ")[0] },
      });
    } catch (error) {
      useErrorStore.getState().showError((error as APIError).data);
    }
  };

  return { form, onSubmit };
}
