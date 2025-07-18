import { useQuery } from "@tanstack/react-query";
import type { JobModel } from "backend/modules/job/model";
import { QueryCacheKey } from "@/app/queryClient";
import { type AppCacheKey, apiClient } from "@/lib/apiClient";

export function useJobQuery(query: Partial<JobModel.JobSelectQuery>) {
	const key: AppCacheKey = [QueryCacheKey.JobList, query];
	const { data: jobs, isLoading } = useQuery({
		queryKey: key,
		queryFn: () =>
			apiClient.job.get({
				query,
			}),
		refetchOnMount: true,
		refetchInterval: 1000 * 60,
	});

	return {
		jobs: jobs?.data,
		isLoading,
		key,
	};
}
