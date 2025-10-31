import { SelectWithLabel } from "@/components/form/SelectWithLabel";
import usePricingModelsList from "../hooks/usePricingModelsList";

type PricingModelSelectProps = {
  onSelect: (id: number | null) => void;
  defaultValue?: number;
};

export function PricingModelSelect(props: PricingModelSelectProps) {
  const { data: pricingModels } = usePricingModelsList();

  return (
    <SelectWithLabel
      onSelect={(id) => {
        props.onSelect(id === null ? null : Number(id));
      }}
      items={pricingModels}
      label={"Pricing Models"}
      defaultValue={String(props.defaultValue)}
    />
  );
}
