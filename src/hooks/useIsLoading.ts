import { useQueryClient } from "@tanstack/react-query";
import type { AppCacheKey } from "@/lib/apiClient";

export default function useIsLoading(key: AppCacheKey) {
  return !!useQueryClient().isFetching({
    queryKey: key,
  });
}
