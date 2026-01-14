import { CheckboxCard, Input, Spinner } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/JobModel";
import { QueryCacheKey } from "@/app/queryClient";
import { useUserIs } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import { FieldWithError } from "@/components/form/FieldWithLabel";
import { OutlineTrashIconButton } from "@/components/icons-button/Trash";
import { toaster } from "@/components/ui/contants";
import { useJobTasks } from "@/features/jobs/hooks/useJobTasks";
import { createJobTask, deleteJobTask } from "@/features/jobs/query";
import useMutationForm from "@/hooks/useMutationForm";
import {
  apiClient,
  apiQueryCacheSingleUpdateList,
  ok,
  structuredUpdateFunc,
} from "@/lib/apiClient";

type JobDialogTasksTabProps = {
  jobId: number;
};

type CreateJobTaskInputs = {
  title: string;
};

export function JobDialogTasksTab({ jobId }: JobDialogTasksTabProps) {
  const { tasks, isLoading } = useJobTasks({
    jobId,
  });

  const canDelete = useUserIs("admin");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    isPending,
  } = useMutationForm({
    async mutationFn({ title }: CreateJobTaskInputs) {
      const res = await createJobTask(jobId, title);
      if (res !== "error") {
        reset();
        toaster.success({
          title: "Task created",
        });
      }
    },
    defaultValues: { title: "" },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormTemplate
      noData={!tasks || tasks.length === 0 ? "No tasks found" : undefined}
      scrollable
      confirmText="Add Task"
      isLoading={isPending}
      onSubmit={handleSubmit}
    >
      <FieldWithError
        placeholder="Task title"
        {...register("title", { required: true, minLength: 3 })}
        error={errors.title?.type}
      >
        <Input id="job-task-title" />
      </FieldWithError>

      {tasks?.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          canDelete={canDelete}
          jobId={jobId}
        />
      ))}
    </FormTemplate>
  );
}

type TaskCardProps = {
  task: JobModel.JobTask;
  canDelete?: boolean;
  jobId: number;
};

async function toggleJobTask(
  taskId: number,
  jobId: number,
  completed: boolean
) {
  const res = await apiClient.job.task.patch({
    completed,
    id: taskId,
    jobId,
  });

  if (ok(res)) {
    apiQueryCacheSingleUpdateList<JobModel.JobTask>(
      [QueryCacheKey.JobTasks, jobId],
      taskId,
      structuredUpdateFunc({
        completed,
      })
    );
    toaster.success({
      title: completed ? "Task uncompleted" : "Task completed",
    });
  }
}

function TaskCard({ task, jobId, canDelete }: TaskCardProps) {
  return (
    <CheckboxCard.Root
      w="full"
      variant={"surface"}
      defaultChecked={task.completed}
      onCheckedChange={(e) => toggleJobTask(task.id, jobId, !!e.checked)}
    >
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Label>{task.title}</CheckboxCard.Label>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
      {canDelete ? (
        <OutlineTrashIconButton
          onClick={() =>
            deleteJobTask(task.id, task.jobId, () =>
              toaster.success({
                title: "Task deleted",
              })
            )
          }
        />
      ) : null}
    </CheckboxCard.Root>
  );
}
