import { QueryCacheKey } from "@/app/queryClient";
import { toaster } from "@/components/ui/contants";
import { apiClient, apiQueryCacheListDelete, ok } from "@/lib/apiClient";

export async function deletePricingModel(id: number) {
  await apiClient["pricing-model"]({ id })
    .delete()
    .then((res) => {
      if (ok(res)) {
        apiQueryCacheListDelete([QueryCacheKey.PricingModelList], id);
        toaster.success({
          title: "Pricing model deleted",
        });
        return;
      }
    });
}
