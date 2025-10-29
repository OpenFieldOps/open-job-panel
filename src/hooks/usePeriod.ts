import type { PeriodSelectIds } from "@/components/buttons/PeriodSelect";
import { useLocalStorage } from "@/features/admin/hooks/useLocalStorage";

export default function usePeriod(periodId: PeriodSelectIds) {
  const [period, setPeriod] = useLocalStorage<number>(
    7,
    `period-select-${periodId}`
  );

  return {
    period,
    setPeriod,
  };
}
