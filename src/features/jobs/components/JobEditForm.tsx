import { HStack, Spinner } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import FormTemplate from "@/components/block/FormTemplate";
import { FieldWithLabel } from "@/components/form/FieldWithLabel";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import OperatorSelect from "@/features/operator/components/OperatorSelect";
import useMutationForm from "@/hooks/useMutationForm";
import { areObjectLeftKeysEqual } from "@/utils/object";
import useJob from "../hooks/useJob";
import { deleteJob, updateJob } from "../query";
import { JobStatusStep } from "./JobStatusStep";

type JobEditFormProps = {
  jobId: number;
  onSave: () => void;
};

type Inputs = JobModel.JobUpdateBody;

export function JobEditForm({ jobId, onSave }: JobEditFormProps) {
  const { isLoading, job } = useJob({ jobId });

  const { handleSubmit, register, setValue, isPending } =
    useMutationForm<Inputs>({
      mutationFn: async (input: Inputs) => {
        if (areObjectLeftKeysEqual(input, job)) {
          onSave();
          return;
        }
        input.id = jobId;
        await updateJob(input, onSave);
      },
    });

  if (isLoading) return <Spinner />;
  if (!job?.id) return <div>Job not found</div>;

  return (
    <FormTemplate
      isLoading={isPending}
      confirmText="Save"
      onDelete={() => deleteJob(job.id, onSave)}
      onSubmit={handleSubmit}
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
      <HStack w={"full"} justifyContent="space-between" alignItems={"center"}>
        <FieldWithLabel label="Operator">
          <OperatorSelect
            onChange={(id) => setValue("assignedTo", id)}
            defaultValue={job.assignedTo}
          />
        </FieldWithLabel>
      </HStack>
      <JobStatusStep
        onChange={(status) => setValue("status", status)}
        defaultStatus={job.status}
      />
    </FormTemplate>
  );
}
