import { Button, Card, Heading, HStack, VStack } from "@chakra-ui/react";
import type { PricingModel } from "backend/modules/pricing-model/model";
import { Plus } from "lucide-react";
import { QueryCacheKey } from "@/app/queryClient";
import FormTemplate from "@/components/block/FormTemplate";
import { OutlineButton } from "@/components/buttons/Button";
import DeleteButton from "@/components/buttons/DeleteButton";
import InputWithLabel from "@/components/form/InputWithLabel";
import SliderWithLabel from "@/components/form/SliderWithLabel";
import useMutationForm, { type ApiResponse } from "@/hooks/useMutationForm";
import { apiQueryCacheListUpdate } from "@/lib/apiClient";
import {
  type UsePricingRangeListReturn,
  usePricingRangeList,
} from "../hooks/usePricingRangeList";

type PricingModelFormProps = {
  mutationFn: (
    data: PricingModel.PricingModelCreate
  ) => Promise<ApiResponse<PricingModel.PricingModel | null>>;
  onSuccess: (data: PricingModel.PricingModel) => void;
  defaultValues?: Partial<PricingModel.PricingModelCreate>;
  isEdit?: boolean;
};

export default function PricingModelForm({
  mutationFn,
  onSuccess,
  defaultValues,
  isEdit,
}: PricingModelFormProps) {
  const { handleSubmit, errorHandledRegister, isPending, lens } =
    useMutationForm({
      mutationFn,
      onApiSuccess(data: PricingModel.PricingModel) {
        apiQueryCacheListUpdate<PricingModel.PricingModel[]>(
          [QueryCacheKey.PricingModelList],
          (oldData) => {
            const exists = oldData.find((item) => item.id === data.id);
            if (exists) {
              return oldData.map((item) => (item.id === data.id ? data : item));
            }
            return [...oldData, data];
          }
        );
        onSuccess(data);
      },
      defaultValues: defaultValues || {
        name: "",
        baseRate: 50,
        ranges: [] as PricingModel.PricingRangeCreate[],
      },
    });

  const pricingRangeList = usePricingRangeList(lens.focus("ranges"));

  return (
    <FormTemplate
      isLoading={isPending}
      onSubmit={handleSubmit}
      title={isEdit ? "Edit Pricing Model" : "Create Pricing Model"}
      trigger={
        <>
          <OutlineButton
            onClick={() =>
              pricingRangeList.append({ hours: 1, rate: 50, position: 0 })
            }
          >
            <Plus /> Add Range
          </OutlineButton>
          <Button type="submit">Save</Button>
        </>
      }
    >
      <InputWithLabel label="Name" {...errorHandledRegister("name")} />
      <SliderWithLabel
        w={"full"}
        label="Base Rate"
        {...errorHandledRegister("baseRate", { isNumber: true })}
        defaultValue={[defaultValues?.baseRate || 50]}
        min={0}
        max={500}
        step={5}
      />
      <PricingRangesList usePricingRangeListReturn={pricingRangeList} />
    </FormTemplate>
  );
}

type PricingRangesListProps = {
  usePricingRangeListReturn: UsePricingRangeListReturn;
};

function PricingRangesList({
  usePricingRangeListReturn: { fields, remove, update },
}: PricingRangesListProps) {
  let currentStart = 0;

  return (
    <VStack overflowY="auto" py={2} maxH="40vh" w="full">
      {fields.map((field, i) => {
        const start = currentStart;
        const end = start + field.hours;
        currentStart = end;

        return (
          <PricingRangeForm
            key={field.id}
            update={(param) => update(i, param)}
            onDelete={() => remove(i)}
            start={start}
            end={end}
            {...field}
          />
        );
      })}
    </VStack>
  );
}

type PricingRangeProps = {
  onDelete: () => void;
  update: (param: Parameters<UsePricingRangeListReturn["update"]>[1]) => void;
} & PricingModel.PricingRangeCreate & { start: number; end: number };

function PricingRangeForm({
  start,
  end,
  update,
  onDelete,
  rate,
  hours,
}: PricingRangeProps) {
  return (
    <Card.Root w="full" gap={4} p={4} variant="outline">
      <SliderWithLabel
        label="Hours"
        min={1}
        max={24}
        step={1}
        flex={1}
        defaultValue={[hours]}
        onValueChangeEnd={({ value }) =>
          update({ hours: value[0], rate, position: 0 })
        }
      />
      <SliderWithLabel
        label="Rate"
        min={0}
        max={500}
        step={5}
        flex={1}
        defaultValue={[rate]}
        onValueChangeEnd={({ value }) =>
          update({ rate: value[0], hours, position: 0 })
        }
      />
      <HStack alignItems={"center"} gap={4} w="full">
        <Heading size={"lg"}>
          {start}h → {end}h : {rate} $/hr
        </Heading>
        <DeleteButton onClick={onDelete} />
      </HStack>
    </Card.Root>
  );
}
