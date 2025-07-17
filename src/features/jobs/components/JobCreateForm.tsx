import type { JobModel } from "backend/modules/job/model";
import { useAtomValue } from "jotai";
import { useForm } from "react-hook-form";
import { useUserId } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import { toaster } from "@/components/ui/contants";
import { apiClient, apiQueryCacheListUpdate, ok } from "@/lib/apiClient";
import { jobAsCalendarEvent, jobSelectedPeriodAtom } from "../atoms";
import type { JobEventCalendar } from "../hooks/useJobList";
import { getJobsListKey } from "../query";

type Inputs = {
  title: string;
  description: string;
};

type JobCreateFormProps = {
  onCreated: () => void;
};

function useJobCreate({ onCreated }: JobCreateFormProps) {
  const value = useAtomValue(jobSelectedPeriodAtom);
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
        startDate: value.start.clone().set("hour", 9).toISOString(),
        endDate: value.start.clone().set("hour", 12).toISOString(),
        assignedTo: userId,
      })
      .then((res) => {
        if (ok(res) && res.data) {
          const job: JobModel.Job = res.data;
          apiQueryCacheListUpdate(
            getJobsListKey(),
            (oldData: JobEventCalendar[]) => [
              ...oldData,
              jobAsCalendarEvent(job, oldData.length),
            ]
          );
          toaster.success({
            title: "Job created",
          });
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
