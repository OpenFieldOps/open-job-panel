import { useAtomValue, useSetAtom } from "jotai";
import { interventionsAtom, interventionSelectedPeriodAtom } from "../atoms";
import type { InterventionModel } from "backend/modules/intervention/model";

export default function useInterventionList() {
  const { data, isLoading } = useAtomValue(interventionsAtom);
  const setPeriod = useSetAtom(interventionSelectedPeriodAtom);
  return {
    interventions: data?.data || [],
    isLoading,
    setPeriod,
  };
}

export type InterventionEventCalendar = {
  start: string;
  end: string;
  extendedProps: InterventionModel.Intervention & { index: number };
};
