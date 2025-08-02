import {
  Button,
  CheckboxCard,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useUserRole } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import { OutlineIconButton } from "@/components/buttons/Button";
import { FieldWithError } from "@/components/form/FieldWithLabel";
import { toaster } from "@/components/ui/contants";
import { useJobTasks } from "@/features/jobs/hooks/useJobTasks";
import {
  createJobTask,
  deleteJobTask,
  toggleJobTask,
} from "@/features/jobs/query";

type JobDialogTasksTabProps = {
  jobId: number;
};

type CreateJobTaskInputs = {
  title: string;
};

export function JobDialogTasksTab({ jobId }: JobDialogTasksTabProps) {
  const role = useUserRole();

  const { tasks, isLoading } = useJobTasks({
    jobId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateJobTaskInputs>({
    defaultValues: { title: "" },
  });

  const onSubmit = handleSubmit(({ title }) => {
    createJobTask(jobId, title, () => {
      reset();
      toaster.success({
        title: "Task created",
      });
    });
  });

  const trigger = (
    <>
      <FieldWithError
        placeholder="Task title"
        {...register("title", { required: true, minLength: 3 })}
        error={errors.title?.type}
      >
        <Input id="job-task-title" />
      </FieldWithError>
      <Button type="submit">Add Task</Button>
    </>
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (!tasks || tasks.length === 0) {
    return (
      <FormTemplate confirmText="Add" trigger={trigger} onSubmit={onSubmit}>
        <Heading mb={4}>No tasks found</Heading>
      </FormTemplate>
    );
  }

  const canDelete = role === "admin";
  return (
    <FormTemplate scrollable trigger={trigger} onSubmit={onSubmit}>
      {tasks.map((task) => (
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
        <OutlineIconButton
          onClick={() =>
            deleteJobTask(task.id, task.jobId, () => {
              toaster.success({
                title: "Task deleted",
              });
            })
          }
        >
          <Trash2 />
        </OutlineIconButton>
      ) : null}
    </CheckboxCard.Root>
  );
}
