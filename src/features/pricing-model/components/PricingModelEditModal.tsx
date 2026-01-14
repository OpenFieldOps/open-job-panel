import type { UseDialogReturn } from "@chakra-ui/react";
import type { PricingModel } from "backend/modules/pricing-model/PricingModelModel";
import { DialogContent } from "@/components/dialog/ButtonDialog";
import { toaster } from "@/components/ui/contants";
import PricingModelForm from "./PricingModelForm";
import { apiClient } from "@/lib/apiClient";

type PricingModelEditModalProps = {
  dialog: UseDialogReturn;
  model: PricingModel.PricingModel;
};

export default function PricingModelEditModal({
  model,
  dialog,
}: PricingModelEditModalProps) {
  return (
    <DialogContent
      dialogState={dialog}
      dialogContentprops={{
        gap: 4,
      }}
    >
      <PricingModelForm
        defaultValues={model}
        isEdit
        onSuccess={() => {
          toaster.success({
            title: "Pricing model updated",
          });
          dialog.setOpen(false);
        }}
        mutationFn={async (data) => {
          return await apiClient["pricing-model"]({ id: model.id }).patch({
            id: model.id,
            baseRate: data.baseRate,
            name: data.name,
            ranges: data.ranges,
          });
        }}
      />
    </DialogContent>
  );
}
