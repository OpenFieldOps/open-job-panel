import { useQuery } from "@tanstack/react-query";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

type UseJobTasksProps = {
  jobId: number;
};

export function useJobTasks({ jobId }: UseJobTasksProps) {
  const { data, isLoading } = useQuery({
    queryKey: [QueryCacheKey.JobTasks, jobId],
    queryFn: () => apiClient.job({ id: jobId }).task.get(),
  });

  const tasks = data?.data;

  return {
    tasks,
    isLoading,
  };
}
