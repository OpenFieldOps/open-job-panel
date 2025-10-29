import type { JobModel } from "backend/modules/job/JobModel";
import { useAtom, useAtomValue } from "jotai";
import { jobSelectedPeriodAtom, jobsAtom } from "../atoms";

export default function useJobList() {
  const { data, isLoading } = useAtomValue(jobsAtom);
  const [period, setPeriod] = useAtom(jobSelectedPeriodAtom);

  return {
    jobs: data?.data || [],
    isLoading,
    period,
    setPeriod,
  };
}

export type JobEventCalendar = {
  id: number;
  start: string;
  end: string;
  extendedProps: JobModel.Job & { index: number };
};
