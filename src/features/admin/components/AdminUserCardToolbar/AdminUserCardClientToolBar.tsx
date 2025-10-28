import { toaster } from "@/components/ui/contants";
import { PricingModelListSelect } from "@/features/pricing-model/components/PricingModelSelect";
import { apiClient, ok } from "@/lib/apiClient";
import useUser from "../../hooks/useUser";

type UserCardProps = {
  userId: number;
};

export function AdminUserCardClientToolBar({ userId }: UserCardProps) {
  const user = useUser("client", userId);

  return (
    <PricingModelListSelect
      defaultValue={user?.pricingModel || undefined}
      onSelect={(value) => {
        apiClient["pricing-model"]
          .assign({ userId })
          .put({ pricingModelId: value })
          .then((res) => {
            if (ok(res)) {
              toaster.success({
                title: "Pricing model updated",
              });
            } else {
              toaster.error({
                title: "Failed to update pricing model",
              });
            }
          });
      }}
    />
  );
}
