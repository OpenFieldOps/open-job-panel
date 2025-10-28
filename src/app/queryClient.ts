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
  Supervisor = 7,
  SupervisorList = 8,
  Client = 9,
  ClientList = 10,
  Notifications = 11,
  PricingModelList = 12,
  PricingModel = 13,
}

export function BuildQueryCacheKey(
  ...args: [QueryCacheKey, number | string]
): [QueryCacheKey, number | string] {
  return [args[0], args[1]];
}
