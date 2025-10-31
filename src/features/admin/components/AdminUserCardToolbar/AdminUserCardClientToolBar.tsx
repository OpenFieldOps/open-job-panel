import { HStack, Input, Separator } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import FormTemplate from "@/components/block/FormTemplate";
import { OutlineButton } from "@/components/buttons/Button";
import { TriggeredDialog } from "@/components/dialog/ButtonDialog";
import { FieldWithLabel } from "@/components/form/FieldWithLabel";
import { toaster } from "@/components/ui/contants";
import { PricingModelSelect } from "@/features/pricing-model/components/PricingModelSelect";
import { apiClient, downloadBuffer, ok } from "@/lib/apiClient";
import useUser from "../../hooks/useUser";

type UserCardProps = {
  userId: number;
};

type Inputs = {
  invoicePeriodStart: string;
  invoicePeriodEnd: string;
};

export function AdminUserCardClientToolBar({ userId }: UserCardProps) {
  const user = useUser("client", userId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      invoicePeriodStart: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
      invoicePeriodEnd: dayjs().format("YYYY-MM-DD"),
    },
  });

  const startDate = watch("invoicePeriodStart");

  const onSubmit = handleSubmit((data) => {
    downloadBuffer(
      "api/invoice/generate",
      "Invoice.pdf",
      JSON.stringify({
        clientId: userId,
        startDate: data.invoicePeriodStart,
        endDate: data.invoicePeriodEnd,
      })
    );
  });

  return (
    <TriggeredDialog trigger={<OutlineButton>Client Settings</OutlineButton>}>
      <FormTemplate
        onSubmit={onSubmit}
        title="Client Settings"
        confirmText="Download Invoice"
      >
        <PricingModelSelect
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
        <Separator />
        <HStack w={"full"} alignItems={"flex-start"}>
          <FieldWithLabel
            label="Invoice periode start"
            error={errors.invoicePeriodStart?.message}
          >
            <Input
              type="date"
              {...register("invoicePeriodStart", {
                required: "Start date is required",
              })}
            />
          </FieldWithLabel>
          <FieldWithLabel
            label="Invoice periode end"
            error={errors.invoicePeriodEnd?.message}
          >
            <Input
              type="date"
              {...register("invoicePeriodEnd", {
                required: "End date is required",
                validate: (value) => {
                  if (!startDate) return true;
                  return (
                    dayjs(value).isAfter(dayjs(startDate)) ||
                    "End date must be after start date"
                  );
                },
              })}
            />
          </FieldWithLabel>
        </HStack>
      </FormTemplate>
    </TriggeredDialog>
  );
}
