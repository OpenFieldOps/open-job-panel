import { useQuery } from "@tanstack/react-query";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

type UseJobDocumentsProps = {
	jobId: number;
};

export function useJobDocuments({ jobId }: UseJobDocumentsProps) {
	const { data, isLoading } = useQuery({
		queryKey: [QueryCacheKey.JobDocuments, jobId],
		queryFn: () => apiClient.job.documents({ jobId }).get(),
	});

	const documents = data?.data;

	return {
		documents,
		isLoading,
	};
}
