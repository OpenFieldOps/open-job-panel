import { QueryClient } from "@tanstack/react-query";
import { MINUTES_MILLIS } from "@/utils/time";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: MINUTES_MILLIS * 3,
    },
  },
});

export enum QueryCacheKey {
  Job = 0,
  JobList = 1,
  JobDocuments = 3,
  JobTasks = 4,
  Operator = 5,
  OperatorList = 6,
  Notifications = 7,
}
