import { QueryCacheKey } from "@/app/queryClient";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import { apiClient } from "@/lib/apiClient";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { JobModel } from "backend/modules/job/model";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { JobStatusStep } from "./JobStatusStep";
import { deleteJob, updateJob } from "../query";
import { areObjectLeftKeysEqual } from "@/utils/object";

type JobEditFormProps = {
  jobId: number;
  onSave: () => void;
};

import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";

function Jobtabs() {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List>
        <Tabs.Trigger value="members">
          <LuUser />
          Members
        </Tabs.Trigger>
        <Tabs.Trigger value="projects">
          <LuFolder />
          Projects
        </Tabs.Trigger>
        <Tabs.Trigger value="tasks">
          <LuSquareCheck />
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="members">Manage your team members</Tabs.Content>
      <Tabs.Content value="projects">Manage your projects</Tabs.Content>
      <Tabs.Content value="tasks">
        Manage your tasks for freelancers
      </Tabs.Content>
    </Tabs.Root>
  );
}

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
      status: status as JobModel.JobStatusEnum,
    };
    // check if body has is same as data.data
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
      onDelete={() => deleteJob(data.data.id, onSave)}
      onSubmit={handleSubmit(onSubmit)}
      title="Edit Job"
      confirmText="Save"
    >
      <Jobtabs />
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
      <InputWithLabel
        label="Location"
        placeholder="Job location"
        defaultValue={data.data.location}
        {...register("location")}
      />
      <JobStatusStep status={status} onChange={setStatus} />
    </FormTemplate>
  );
}
