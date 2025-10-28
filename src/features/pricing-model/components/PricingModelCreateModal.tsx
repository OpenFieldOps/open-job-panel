import { useDialog } from "@chakra-ui/react";
import { TriggeredDialog } from "@/components/dialog/ButtonDialog";
import { toaster } from "@/components/ui/contants";
import { apiClient } from "@/lib/apiClient";
import PricingModelForm from "./PricingModelForm";

type PricingModelCreateModalProps = {
  trigger: React.ReactNode;
};

export default function PricingModelCreateModal({
  trigger,
}: PricingModelCreateModalProps) {
  const dialog = useDialog();
  return (
    <TriggeredDialog
      dialogState={dialog}
      trigger={trigger}
      dialogContentprops={{
        gap: 4,
      }}
    >
      <PricingModelForm
        onSuccess={() => {
          toaster.success({
            title: "Pricing model created",
          });
          dialog.setOpen(false);
        }}
        mutationFn={(data) => apiClient["pricing-model"].post(data)}
      />
    </TriggeredDialog>
  );
}
