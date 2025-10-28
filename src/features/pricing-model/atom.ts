import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";
import { atomWithQuery } from "jotai-tanstack-query";

export const pricingModelsAtom = atomWithQuery(() => {
  return {
    queryKey: [QueryCacheKey.PricingModelList] as const,
    queryFn: async () => {
      return await apiClient["pricing-model"].get();
    },
  };
});
