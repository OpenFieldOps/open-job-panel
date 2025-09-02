import { type DefaultOptions, useQuery } from "@tanstack/react-query";
import type { UserModel } from "backend/modules/user/model";
import { useMemo } from "react";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

type UseAssignedUsersOptions = {
  enabled?: boolean;
  role: UserModel.UserRole;
  refetchInterval?: number;
} & DefaultOptions;

const userRoleQueryCacheKey: Map<UserModel.UserRole, QueryCacheKey> = new Map();

userRoleQueryCacheKey.set("operator", QueryCacheKey.OperatorList);
userRoleQueryCacheKey.set("supervisor", QueryCacheKey.SupervisorList);
userRoleQueryCacheKey.set("client", QueryCacheKey.ClientList);

export default function useAssignedUsers({
  enabled = true,
  role,
  refetchInterval,
}: UseAssignedUsersOptions) {
  const { data, isLoading } = useQuery({
    queryKey: [userRoleQueryCacheKey.get(role) as QueryCacheKey],
    enabled,
    refetchInterval,
    queryFn: () =>
      apiClient.user["get-assigned-users"]({
        role,
      }).get(),
  });

  const users = useMemo(() => data?.data || [], [data?.data]);

  return {
    users,
    isLoading,
  };
}
