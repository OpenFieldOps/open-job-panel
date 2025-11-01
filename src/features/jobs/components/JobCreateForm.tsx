import type { JobModel } from "backend/modules/job/JobModel";
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
import { Checkbox, HStack } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

type Inputs = {
  title: string;
  description: string;
  broadcast: boolean;
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
    control,
  } = useMutationForm({
    mutationFn: ({ title, description, broadcast }: Inputs) => {
      return apiClient.job.post({
        title,
        description,
        broadcast: broadcast,
        startDate: dayjs(value.start)
          .startOf("day")
          .set("hour", 9)
          .toISOString(),
        endDate: dayjs(value.start)
          .startOf("day")
          .set("hour", 14)
          .toISOString(),
        operatorIds: [],
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
    control,
  };
}

export default function JobCreateForm({ onCreated }: JobCreateFormProps) {
  const { register, errors, handleSubmit, isPending, control } = useJobCreate({
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
      <HStack justifyContent={"flex-start"} w={"full"}>
        <Controller
          name="broadcast"
          control={control}
          render={({ field }) => (
            <Checkbox.Root
              onCheckedChange={() => field.onChange(!field.value)}
              checked={field.value}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Broadcast ?</Checkbox.Label>
            </Checkbox.Root>
          )}
        />
      </HStack>
    </FormTemplate>
  );
}
