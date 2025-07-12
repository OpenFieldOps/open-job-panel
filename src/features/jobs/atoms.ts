import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";
import type { JobModel } from "backend/modules/job/model";
import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

export const jobSelectedPeriodAtom = atom({
  start: dayjs().startOf("day"),
  end: dayjs().add(6, "day").endOf("day"),
});

export function jobAsCalendarEvent(job: JobModel.Job, index: number) {
  return {
    id: job.id,
    start: job.startDate,
    end: job.endDate,
    extendedProps: { ...job, index },
  };
}

export const jobsAtom = atomWithQuery((get) => {
  const period = get(jobSelectedPeriodAtom);

  const start = period.start.toISOString();
  const end = period.end.toISOString();

  return {
    queryKey: [QueryCacheKey.JobList, start, end],
    queryFn: async () => {
      const res = await apiClient.job.get({
        query: {
          start,
          end,
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
