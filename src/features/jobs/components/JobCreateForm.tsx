import type { JobModel } from "backend/modules/job/model";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { useUserId } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import { toaster } from "@/components/ui/contants";
import useMutationForm from "@/hooks/useMutationForm";
import { apiClient, apiQueryCacheListUpdate } from "@/lib/apiClient";
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
    handleSubmit,
    errorHandledRegister,
    formState: { errors },
    isPending,
  } = useMutationForm({
    mutationFn: ({ title, description }: Inputs) => {
      return apiClient.job.post({
        title,
        description,
        startDate: dayjs(value.start)
          .startOf("day")
          .set("hour", 9)
          .toISOString(),
        endDate: dayjs(value.start)
          .startOf("day")
          .set("hour", 14)
          .toISOString(),
        assignedTo: userId,
      });
    },
    onApiSuccess(data) {
      const job: JobModel.Job = data;
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
    },
  });

  return {
    register: errorHandledRegister,
    errors,
    handleSubmit,
    isPending,
  };
}

export default function JobCreateForm({ onCreated }: JobCreateFormProps) {
  const { register, errors, handleSubmit, isPending } = useJobCreate({
    onCreated,
  });

  return (
    <FormTemplate
      onSubmit={handleSubmit}
      title="Create an Job"
      isLoading={isPending}
    >
      <InputWithLabel
        label="Title"
        placeholder="Job title"
        {...register("title")}
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
