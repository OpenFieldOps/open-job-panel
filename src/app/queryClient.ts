import { MINUTES_MILLIS } from "@/utils/time";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: MINUTES_MILLIS * 1,
    },
  },
});

export enum QueryCacheKey {
  Job = 0,
  JobList = 1,
  Operator = 2,
  OperatorList = 3,
}
