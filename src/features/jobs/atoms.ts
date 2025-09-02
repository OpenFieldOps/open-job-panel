import type { JobModel } from "backend/modules/job/model";
import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";
import type { JobEventCalendar } from "./hooks/useJobList";

const defaultAtom = {
  start: dayjs().startOf("day"),
  end: dayjs().add(7, "day"),
};

export const jobSelectedPeriodAtom = atom(defaultAtom);

export function jobAsCalendarEvent(job: JobModel.Job, index: number) {
  return {
    id: job.id,
    start: job.startDate,
    end: job.endDate,
    extendedProps: { ...job, index },
  } as JobEventCalendar;
}

export const jobsAtom = atomWithQuery((get) => {
  const { start, end } = get(jobSelectedPeriodAtom);

  return {
    queryKey: [QueryCacheKey.JobList, start.date(), end.date()] as const,
    queryFn: async () => {
      const res = await apiClient.job.get({
        query: {
          start: start.toISOString(),
          end: end.toISOString(),
        },
      });

      if (res.data) {
        return {
          ...res,
          data: res.data.map((job, index) => jobAsCalendarEvent(job, index)),
        };
      }

      return res;
    },
  };
});
