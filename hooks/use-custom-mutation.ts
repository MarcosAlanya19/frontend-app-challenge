import { useErrorStore } from "@/stores/use-error-store";
import { APIError } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useCustomMutation<TData = unknown, TVariables = void>(
  mutationOptions: UseMutationOptions<TData, APIError, TVariables>,
) {
  const showError = useErrorStore((s) => s.showError);

  const { mutateAsync, isPending } = useMutation({
    ...mutationOptions,
    onError: (...args) => {
      showError(args?.[0]?.data);
      mutationOptions.onError?.(...args);
    },
  });

  const handle = async (variables: TVariables): Promise<TData | undefined> => {
    try {
      return await mutateAsync(variables);
    } catch {
      return undefined;
    }
  };

  return { handle, isLoading: isPending };
}
