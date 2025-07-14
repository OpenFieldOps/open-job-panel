import { Spinner } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import { useEffect, useState } from "react";
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

type Inputs = JobModel.JobUpdateBody;

export function JobEditForm({ jobId, onSave }: JobEditFormProps) {
  const role = useUserRole();

  const { isLoading, job } = useJob({ jobId });

  const [status, setStatus] = useState<JobModel.JobStatusString>("pending");

  useEffect(() => {
    setStatus(job?.status || "pending");
  }, [job?.status]);

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
      <JobStatusStep onChange={setStatus} status={status} />
    </FormTemplate>
  );
}
