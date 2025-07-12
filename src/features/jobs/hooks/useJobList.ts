import { useAtom, useAtomValue } from "jotai";
import { jobsAtom, jobSelectedPeriodAtom } from "../atoms";
import type { JobModel } from "backend/modules/job/model";

export default function useJobList() {
  const { data, isLoading } = useAtomValue(jobsAtom);
  const [period, setPeriod] = useAtom(jobSelectedPeriodAtom);
  return {
    period,
    setPeriod,
    jobs: data?.data || [],
    isLoading,
  };
}

export type JobEventCalendar = {
  id: number;
  start: string;
  end: string;
  extendedProps: JobModel.Job & { index: number };
};
