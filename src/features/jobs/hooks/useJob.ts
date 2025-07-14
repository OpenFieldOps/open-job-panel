import { useQuery } from "@tanstack/react-query";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

type UseJobProps = {
	jobId: number;
};

export default function useJob({ jobId }: UseJobProps) {
	const { isLoading, data } = useQuery({
		queryKey: [QueryCacheKey.Job, jobId],
		queryFn: () => apiClient.job({ id: jobId }).get(),
	});

	return {
		isLoading,
		job: data?.data,
	};
}
