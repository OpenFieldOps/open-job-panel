import type { UseDialogReturn } from "@chakra-ui/react";
import type { PricingModel } from "backend/modules/pricing-model/PricingModelModel";
import { DialogContent } from "@/components/dialog/ButtonDialog";
import { toaster } from "@/components/ui/contants";
import { apiClient } from "@/lib/apiClient";
import PricingModelForm from "./PricingModelForm";

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
        mutationFn={async (data) =>
          apiClient["pricing-model"]({ id: model.id }).patch({
            id: model.id,
            ...data,
          })
        }
      />
    </DialogContent>
  );
}
