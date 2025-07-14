import { useQuery } from "@tanstack/react-query";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

export default function useOperators() {
	const { data: operators } = useQuery({
		queryKey: [QueryCacheKey.OperatorList],
		queryFn: () => apiClient.user["assigned-users"].get(),
	});

	return {
		operators: operators?.data || [],
	};
}
