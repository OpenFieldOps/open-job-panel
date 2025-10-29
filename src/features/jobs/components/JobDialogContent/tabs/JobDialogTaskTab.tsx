import { CheckboxCard, Input, Spinner } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/JobModel";
import { useUserIs } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import { FieldWithError } from "@/components/form/FieldWithLabel";
import { OutlineTrashIconButton } from "@/components/icons-button/Trash";
import { toaster } from "@/components/ui/contants";
import { useJobTasks } from "@/features/jobs/hooks/useJobTasks";
import {
  createJobTask,
  deleteJobTask,
  toggleJobTask,
} from "@/features/jobs/query";
import useMutationForm from "@/hooks/useMutationForm";

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
  } = useMutationForm({
    mutationFn({ title }: CreateJobTaskInputs) {
      createJobTask(jobId, title, () => {
        reset();
        toaster.success({
          title: "Task created",
        });
      });
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

function TaskCard({ task, jobId, canDelete }: TaskCardProps) {
  return (
    <CheckboxCard.Root
      w="full"
      variant={"surface"}
      defaultChecked={task.completed}
      onCheckedChange={(e) =>
        toggleJobTask(task.id, jobId, !!e.checked, () => {
          toaster.success({
            title: task.completed ? "Task uncompleted" : "Task completed",
          });
        })
      }
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
