import { QueryClient } from "@tanstack/react-query";
import { MINUTES_MILLIS } from "@/utils/time";

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
	JobDocuments = 3,

	Operator = 4,
	OperatorList = 5,
}
