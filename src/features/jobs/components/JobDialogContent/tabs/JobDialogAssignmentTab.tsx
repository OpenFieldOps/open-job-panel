import { For, Heading, HStack, Spinner, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { QueryCacheKey } from "@/app/queryClient";
import FormTemplate from "@/components/block/FormTemplate";
import { OutlineButton } from "@/components/buttons/Button";
import ConfirmAlertDialog from "@/components/dialog/ConfirmAlertDialog";
import { OutlineTrashIconButton } from "@/components/icons-button/Trash";
import { toaster } from "@/components/ui/contants";
import { UserCardMinimal } from "@/features/user/components/UserCard";
import OperatorSelect from "@/features/operator/components/OperatorSelect";
import { apiClient, ok } from "@/lib/apiClient";
import ClientSelect from "@/features/admin/components/ClientSelect";
import { updateJob } from "@/features/jobs/query";
import { FieldWithLabel } from "@/components/form/FieldWithLabel";
import useJob from "@/features/jobs/hooks/useJob";

function useAssignedOperators(jobId: number) {
  const { data, isLoading } = useQuery({
    queryKey: [QueryCacheKey.JobOperators, jobId],
    queryFn: apiClient.job.operators({ jobId }).get,
  });

  return {
    data: data?.data || [],
    isLoading,
  };
}

export function JobDialogAssignementTab({ jobId }: { jobId: number }) {
  const queryClient = useQueryClient();

  const job = useJob({ jobId }).job;

  const { data: operators, isLoading } = useAssignedOperators(jobId);

  const [selectedOperatorId, setSelectedOperatorId] = useState<number | null>(
    null
  );
  const [selectKey, setSelectKey] = useState(0);

  const { mutate: addOperator, isPending: isAdding } = useMutation({
    mutationFn: async (operatorId: number) => {
      const currentOperatorIds = operators.map((op) => op.id);
      return await apiClient.job.operators.post({
        jobId,
        operatorIds: [...currentOperatorIds, operatorId],
      });
    },
    onSuccess: (res) => {
      if (ok(res)) {
        queryClient.invalidateQueries({
          queryKey: [QueryCacheKey.JobOperators, jobId],
        });
        toaster.success({ title: "Operator assigned successfully" });
        setSelectedOperatorId(null);
        setSelectKey((prev) => prev + 1);
      }
    },
  });

  const { mutate: removeOperator } = useMutation({
    mutationFn: async (operatorId: number) => {
      const currentOperatorIds = operators.map((op) => op.id);
      const newOperatorIds = currentOperatorIds.filter(
        (id) => id !== operatorId
      );
      return await apiClient.job.operators.post({
        jobId,
        operatorIds: newOperatorIds,
      });
    },
    onSuccess: (res) => {
      if (ok(res)) {
        queryClient.invalidateQueries({
          queryKey: [QueryCacheKey.JobOperators, jobId],
        });
        toaster.success({ title: "Operator removed successfully" });
      }
    },
  });

  const handleAddOperator = () => {
    if (
      selectedOperatorId &&
      !operators.find((op) => op.id === selectedOperatorId)
    ) {
      addOperator(selectedOperatorId);
    } else if (operators.find((op) => op.id === selectedOperatorId)) {
      toaster.error({ title: "Operator already assigned to this job" });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormTemplate
      scrollable
      noData={
        !operators || operators.length === 0
          ? "No operators assigned"
          : undefined
      }
      trigger={
        <HStack>
          <OperatorSelect
            key={selectKey}
            clearable={true}
            onChange={(id) => setSelectedOperatorId(id)}
          />
          <OutlineButton
            onClick={handleAddOperator}
            disabled={!selectedOperatorId || isAdding}
          >
            <Plus /> Add Operator
          </OutlineButton>
        </HStack>
      }
    >
      <FieldWithLabel label="Assign Client">
        <ClientSelect
          defaultValue={job?.assignedClient || undefined}
          onChange={(id) => {
            updateJob({
              id: jobId,
              assignedClient: id,
            });
          }}
        />
      </FieldWithLabel>

      <VStack w="full" gap={2}>
        {operators.length > 0 && (
          <Heading size="sm" alignSelf="flex-start">
            Assigned Operators ({operators.length})
          </Heading>
        )}
        <For each={operators}>
          {(operator) => (
            <UserCardMinimal
              key={operator.id}
              {...operator}
              right={
                <ConfirmAlertDialog
                  title="Remove Operator"
                  description={`Are you sure you want to remove ${operator.firstName} ${operator.lastName} from this job?`}
                  onConfirm={() => removeOperator(operator.id)}
                >
                  <OutlineTrashIconButton />
                </ConfirmAlertDialog>
              }
            />
          )}
        </For>
      </VStack>
    </FormTemplate>
  );
}
