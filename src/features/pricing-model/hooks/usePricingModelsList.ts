import { useAtomValue } from "jotai";
import { pricingModelsAtom } from "../atom";

export default function usePricingModelsList() {
  const query = useAtomValue(pricingModelsAtom);
  return {
    isLoading: query.isLoading,
    data: query.data?.data || [],
  };
}
