import useAssignedUsers from "./useAssignedUsers";

type UseOperatorsOptions = {
  enabled?: boolean;
  refetchInterval?: number;
};

export default function useOperators({
  enabled = true,
  refetchInterval,
}: UseOperatorsOptions = {}) {
  const { users, isLoading } = useAssignedUsers({
    enabled,
    role: "operator",
    refetchInterval,
  });

  return {
    operators: users,
    isLoading,
  };
}
