import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";
import type { InterventionModel } from "backend/modules/intervention/model";
import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

export const interventionSelectedPeriodAtom = atom({
  start: dayjs().startOf("day"),
  end: dayjs().add(6, "day").endOf("day"),
});

export function interventionAsCalendarEvent(
  intervention: InterventionModel.Intervention,
  index: number
) {
  return {
    start: intervention.startDate,
    end: intervention.endDate,
    extendedProps: { ...intervention, index },
  };
}

export const interventionsAtom = atomWithQuery((get) => {
  const period = get(interventionSelectedPeriodAtom);

  const start = period.start.toISOString();
  const end = period.end.toISOString();

  return {
    queryKey: [QueryCacheKey.InterventionList, start, end],
    queryFn: async () => {
      const res = await apiClient.intervention.get({
        query: {
          start,
          end,
        },
      });

      if (res.data) {
        return {
          ...res,
          data: res.data.map((intervention, index) =>
            interventionAsCalendarEvent(intervention, index)
          ),
        };
      }

      return res;
    },
  };
});
