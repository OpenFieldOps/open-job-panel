import type { Lens } from "@hookform/lenses";
import type { PricingModel } from "backend/modules/pricing-model/model";
import { useFieldArray } from "react-hook-form";

type UsePricingRangeListProps = Lens<PricingModel.PricingRangeCreate[]>;

export function usePricingRangeList(lens: UsePricingRangeListProps) {
  const result = useFieldArray(lens.interop());

  return result;
}

export type UsePricingRangeListReturn = ReturnType<typeof usePricingRangeList>;
