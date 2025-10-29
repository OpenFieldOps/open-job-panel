import { SelectWithLabel } from "@/components/form/SelectWithLabel";
import usePricingModelsList from "../hooks/usePricingModelsList";

type PricingModelListSelectProps = {
  onSelect: (id: number) => void;
  defaultValue?: number;
};

export function PricingModelListSelect(props: PricingModelListSelectProps) {
  const { data: pricingModels } = usePricingModelsList();

  return (
    <SelectWithLabel
      onSelect={(id) => props.onSelect(Number(id))}
      items={pricingModels}
      label={"Pricing Models"}
      defaultValue={String(props.defaultValue)}
      inputProps={{ width: "320px" }}
    />
  );
}
