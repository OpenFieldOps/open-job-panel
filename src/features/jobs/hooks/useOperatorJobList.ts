import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

type UseOperatorJobListOptions = {
  operatorId: number;
  enabled?: boolean;
  refetchInterval?: number;
};

export default function useOperatorJobList({
  operatorId,
  enabled = true,
  refetchInterval,
}: UseOperatorJobListOptions) {
  const { data, isLoading } = useQuery({
    queryKey: [QueryCacheKey.JobList, operatorId],
    enabled: enabled && !!operatorId,
    refetchInterval,
    refetchOnMount: true,
    queryFn: async () => {
      const res = await apiClient.job.get({
        query: {
          operatorId,
          notStatus: "completed",
        },
      });
      return res;
    },
  });

  const jobs = useMemo(() => data?.data || [], [data?.data]);

  return {
    jobs,
    isLoading,
  };
}
