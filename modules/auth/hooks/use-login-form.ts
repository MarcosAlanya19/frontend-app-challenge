import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { loginSchema, LoginFormData } from "../schemas/login.schema";
import { login } from "../services/auth.service";

export function useLoginForm() {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
    router.replace("/(tabs)");
  };

  return { methods, onSubmit };
}
