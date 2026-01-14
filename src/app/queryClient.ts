import { QueryClient } from "@tanstack/react-query";
import { MINUTES_MILLIS } from "@/utils/time";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: MINUTES_MILLIS * 3,
      staleTime: MINUTES_MILLIS * 5,
    },
  },
});

export enum QueryCacheKey {
  Job = "Job",
  JobList = "JobList",
  JobOperators = "JobOperators",
  JobDocuments = "JobDocuments",
  JobTasks = "JobTasks",
  AnyUserList = "AnyUserList",
  Operator = "Operator",
  OperatorList = "OperatorList",
  Supervisor = "Supervisor",
  SupervisorList = "SupervisorList",
  Client = "Client",
  ClientList = "ClientList",
  Notifications = "Notifications",
  PricingModelList = "PricingModelList",
  PricingModel = "PricingModel",
  Chat = "Chat",
  ChatList = "ChatList",
}

export function BuildQueryCacheKey(
  ...args: [QueryCacheKey, number | string]
): [QueryCacheKey, number | string] {
  return [args[0], args[1]];
}
