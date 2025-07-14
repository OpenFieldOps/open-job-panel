import { QueryCacheKey } from "@/app/queryClient";
import { useUserId } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import { apiClient, apiQueryCacheListUpdate, ok } from "@/lib/apiClient";
import type { JobModel } from "backend/modules/job/model";
import { useForm } from "react-hook-form";
import { jobAsCalendarEvent } from "../atoms";
import type { JobEventCalendar } from "../hooks/useJobList";
import dayjs from "dayjs";

type Inputs = {
  title: string;
  description: string;
};

type JobCreateFormProps = {
  onCreated: () => void;
};

function useJobCreate({ onCreated }: JobCreateFormProps) {
  const userId = useUserId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = ({ title, description }: Inputs) => {
    apiClient.job
      .post({
        title,
        description,
        startDate: dayjs().set("hour", 9).toISOString(),
        endDate: dayjs().set("hour", 12).toISOString(),
        assignedTo: userId,
      })
      .then((res) => {
        if (ok(res) && res.data) {
          const job: JobModel.Job = res.data;
          apiQueryCacheListUpdate(
            QueryCacheKey.JobList,
            (oldData: JobEventCalendar[]) => [
              ...oldData,
              jobAsCalendarEvent(job, oldData.length),
            ]
          );
          onCreated();
        }
      });
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
}

export default function JobCreateForm({ onCreated }: JobCreateFormProps) {
  const { register, errors, handleSubmit } = useJobCreate({ onCreated });

  return (
    <FormTemplate onSubmit={handleSubmit} title="Create an Job">
      <InputWithLabel
        label="Title"
        placeholder="Job title"
        {...register("title", { required: true, minLength: 3 })}
        error={errors.title?.type}
      />
      <TextAreaWithLabel
        label="Description"
        placeholder="Job description"
        {...register("description")}
        error={errors.description?.type}
      />
    </FormTemplate>
  );
}
