import { useQuery } from "@tanstack/react-query";
import type { AppCacheKey } from "@/lib/apiClient";

export default function useIsLoading(key: AppCacheKey) {
  return useQuery({ queryKey: key, enabled: false }).isLoading;
}
