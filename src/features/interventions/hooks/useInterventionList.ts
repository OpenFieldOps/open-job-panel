import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface DayPeriod {
  start: Dayjs;
  end: Dayjs;
}

type UseDayPeriodProps = {
  period: DayPeriod;
};

const defaultProps: UseDayPeriodProps = {
  period: {
    start: dayjs().startOf("day"),
    end: dayjs().add(6, "day").endOf("day"),
  },
};

function useDayPeriod({ period }: UseDayPeriodProps = defaultProps) {
  const [dayPeriod, setDayPeriod] = useState<DayPeriod>(period);
  return {
    dayPeriod,
    setDayPeriod,
  };
}

export default function useInterventionList() {
  const { dayPeriod } = useDayPeriod();

  const queryKey = useMemo(() => {
    return [
      QueryCacheKey.InterventionList,
      dayPeriod.start.toISOString(),
      dayPeriod.end.toISOString(),
    ];
  }, [dayPeriod.start, dayPeriod.end]);

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      apiClient.intervention.get({
        query: {
          start: dayPeriod.start.toISOString(),
          end: dayPeriod.end.toISOString(),
        },
      }),
  });

  return {
    data,
    isLoading,
  };
}
