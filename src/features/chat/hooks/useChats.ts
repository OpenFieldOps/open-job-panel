import { useQuery } from "@tanstack/react-query";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

export function useChats() {
  const { data, isLoading } = useQuery({
    queryKey: [QueryCacheKey.ChatList],
    queryFn: async () => await apiClient.chat.get(),
  });

  return { data, isLoading };
}
