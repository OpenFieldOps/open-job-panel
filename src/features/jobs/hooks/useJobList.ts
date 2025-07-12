import { useAtomValue, useSetAtom } from "jotai";
import { jobsAtom, jobSelectedPeriodAtom } from "../atoms";
import type { JobModel } from "backend/modules/job/model";

export default function useJobList() {
  const { data, isLoading } = useAtomValue(jobsAtom);
  const setPeriod = useSetAtom(jobSelectedPeriodAtom);
  return {
    jobs: data?.data || [],
    isLoading,
    setPeriod,
  };
}

export type JobEventCalendar = {
  start: string;
  end: string;
  extendedProps: JobModel.Job & { index: number };
};
