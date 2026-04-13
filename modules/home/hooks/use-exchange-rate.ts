import { useQuery } from "@tanstack/react-query";
import { getExchangeRate } from "../services/getExchangeRate.service";

export const useExchangeRate = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["exchangeRate"],
    queryFn: getExchangeRate,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return { data: data?.data, isLoading };
};
