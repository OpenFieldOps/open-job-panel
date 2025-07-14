import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { JobModel } from "backend/modules/job/model";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { QueryCacheKey } from "@/app/queryClient";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import { apiClient } from "@/lib/apiClient";
import { areObjectLeftKeysEqual } from "@/utils/object";
import { deleteJob, updateJob } from "../query";
import { JobStatusStep } from "./JobStatusStep";

type JobEditFormProps = {
  jobId: number;
  onSave: () => void;
};

export function JobEditForm({ jobId, onSave }: JobEditFormProps) {
  const { isLoading, data } = useQuery({
    queryKey: [QueryCacheKey.Job, jobId],
    queryFn: () => apiClient.job({ id: jobId }).get(),
  });

  const [status, setStatus] = useState<JobModel.JobStatusString>("pending");

  useEffect(() => {
    setStatus(data?.data?.status || "pending");
  }, [data?.data?.status]);

  const { handleSubmit, register } = useForm<JobModel.JobUpdateBody>();

  const onSubmit = (input: JobModel.JobUpdateBody) => {
    const body = {
      id: jobId,
      title: input.title,
      description: input.description,
      location: input.location,
      status: status as JobModel.JobStatusEnum,
    };

    if (areObjectLeftKeysEqual(body, data?.data)) {
      onSave();
      return;
    }
    updateJob(body, onSave);
  };

  if (isLoading) return <Spinner />;
  if (!data?.data?.id) return <div>Job not found</div>;

  return (
    <FormTemplate
      confirmText="Save"
      onDelete={() => deleteJob(data.data.id, onSave)}
      onSubmit={handleSubmit(onSubmit)}
      title="Edit Job"
    >
      <InputWithLabel
        defaultValue={data.data.title}
        label="Title"
        placeholder="Job title"
        {...register("title")}
      />
      <TextAreaWithLabel
        defaultValue={data.data.description}
        label="Description"
        placeholder="Job description"
        {...register("description")}
      />
      <InputWithLabel
        defaultValue={data.data.location}
        label="Location"
        placeholder="Job location"
        {...register("location")}
      />
      <JobStatusStep onChange={setStatus} status={status} />
    </FormTemplate>
  );
}
