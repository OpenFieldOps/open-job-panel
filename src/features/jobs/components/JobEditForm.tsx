import { QueryCacheKey } from "@/app/queryClient";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import {
  apiClient,
  apiQueryCacheSingleUpdate,
  apiQueryCachSingleUpdateList,
  ok,
} from "@/lib/apiClient";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { JobModel } from "backend/modules/job/model";
import { useForm } from "react-hook-form";
import type { JobEventCalendar } from "../hooks/useJobList";
import { useEffect, useState } from "react";
import { JobStatusStep } from "./JobStatusStep";
import { deleteJob } from "../query";

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
    apiClient.job
      .patch({
        id: jobId,
        title: input.title,
        description: input.description,
        status: status as JobModel.JobStatusEnum,
      })
      .then((res) => {
        if (ok(res)) {
          apiQueryCacheSingleUpdate(
            QueryCacheKey.Job,
            jobId,
            (oldData: JobModel.Job) => ({
              ...oldData,
              ...input,
              status,
            })
          );

          apiQueryCachSingleUpdateList<JobEventCalendar>(
            QueryCacheKey.JobList,
            jobId,
            (el) => el.extendedProps.id,
            (el) => ({
              ...el,
              extendedProps: {
                ...el.extendedProps,
                ...input,
                status,
              },
            })
          );
          onSave();
        }
      });
  };

  if (isLoading) return <Spinner />;
  if (!data?.data?.id) return <div>Job not found</div>;

  return (
    <FormTemplate
      onDelete={() => deleteJob(data.data.id, onSave)}
      onSubmit={handleSubmit(onSubmit)}
      title="Edit Job"
      confirmText="Save"
    >
      <InputWithLabel
        label="Title"
        placeholder="Job title"
        defaultValue={data.data.title}
        {...register("title")}
      />
      <TextAreaWithLabel
        label="Description"
        placeholder="Job description"
        defaultValue={data.data.description}
        {...register("description")}
      />
      <JobStatusStep status={status} onChange={setStatus} />
    </FormTemplate>
  );
}
