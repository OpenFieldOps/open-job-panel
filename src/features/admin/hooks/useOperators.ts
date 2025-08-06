import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

export default function useOperators({ enabled = true } = { enabled: true }) {
  const { data, isLoading } = useQuery({
    queryKey: [QueryCacheKey.OperatorList],
    enabled,
    queryFn: () =>
      apiClient.user["get-assigned-users"]({
        role: "operator",
      }).get(),
  });

  const operators = useMemo(() => data?.data || [], [data?.data]);

  return {
    operators,
    isLoading,
  };
}
