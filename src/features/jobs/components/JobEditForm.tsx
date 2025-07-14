import { Flex, Spinner, Tabs } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import { Folder, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useUserRole } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import FieldWithLabel from "@/components/form/FieldWithLabel";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import OperatorSelect from "@/features/admin/components/OperatorSelect";
import { areObjectLeftKeysEqual } from "@/utils/object";
import useJob from "../hooks/useJob";
import { deleteJob, updateJob } from "../query";
import { JobStatusStep } from "./JobStatusStep";

type JobEditFormProps = {
  jobId: number;
  onSave: () => void;
};

export function Jobtabs({ jobId, onSave }: JobEditFormProps) {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List>
        <Tabs.Trigger value="members">
          <User />
          State job
        </Tabs.Trigger>
        <Tabs.Trigger value="projects">
          <Folder />
          Documents
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="members">
        <JobEditForm jobId={jobId} onSave={onSave} />
      </Tabs.Content>
      <Tabs.Content value="projects">
        <Files />
      </Tabs.Content>
      <Tabs.Content value="tasks">
        Manage your tasks for freelancers
      </Tabs.Content>
    </Tabs.Root>
  );
}

type Inputs = JobModel.JobUpdateBody;

export function JobEditForm({ jobId, onSave }: JobEditFormProps) {
  const role = useUserRole();

  const { isLoading, job } = useJob({ jobId });

  const { handleSubmit, register, setValue } = useForm<Inputs>();

  const onSubmit = (input: Inputs) => {
    if (areObjectLeftKeysEqual(input, job)) {
      onSave();
      return;
    }
    input.id = jobId;
    updateJob(input, onSave);
  };

  if (isLoading) return <Spinner />;
  if (!job?.id) return <div>Job not found</div>;

  return (
    <FormTemplate
      confirmText="Save"
      onDelete={() => deleteJob(job.id, onSave)}
      onSubmit={handleSubmit(onSubmit)}
      title="Edit Job"
    >
      <InputWithLabel
        defaultValue={job.title}
        label="Title"
        placeholder="Job title"
        {...register("title")}
      />
      <TextAreaWithLabel
        defaultValue={job.description}
        label="Description"
        placeholder="Job description"
        {...register("description")}
      />
      <InputWithLabel
        defaultValue={job.location}
        label="Location"
        placeholder="Job location"
        {...register("location")}
      />
      {role === "admin" && (
        <FieldWithLabel label="Operator">
          <OperatorSelect
            onChange={(id) => setValue("assignedTo", id)}
            defaultValue={job.assignedTo}
          />
        </FieldWithLabel>
      )}
      <JobStatusStep
        onChange={(status) => setValue("status", status)}
        defaultStatus={job.status}
      />
    </FormTemplate>
  );
}
function Files() {
  return <Flex h={"40vh"}>{/* TODO: Display job files  */}</Flex>;
}
