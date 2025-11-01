import { HStack, Spinner } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/JobModel";
import dayjs from "dayjs";
import FormTemplate from "@/components/block/FormTemplate";
import { FieldWithLabel } from "@/components/form/FieldWithLabel";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import useMutationForm from "@/hooks/useMutationForm";
import { areObjectLeftKeysEqual } from "@/utils/object";
import useJob from "../hooks/useJob";
import { deleteJob, updateJob } from "../query";
import { JobStatusStep } from "./JobStatusStep";
import LocationSelect from "@/components/form/LocationSelect";
import { Controller } from "react-hook-form";

type JobEditFormProps = {
  jobId: number;
  onSave: () => void;
};

type Inputs = JobModel.JobUpdateBody;

type JobUpdateBodyWithNull = Omit<Inputs, "assignedTo" | "assignedClient"> & {
  assignedTo?: number | null;
  assignedClient?: number | null;
};

export function JobEditForm({ jobId, onSave }: JobEditFormProps) {
  const { isLoading, job } = useJob({ jobId });
  const {
    handleSubmit,
    errorHandledRegister,
    setValue,
    isPending,
    getAllValues,
    control,
  } = useMutationForm({
    mutationFn: (input: Inputs) => {
      const allValues = getAllValues() as Inputs;
      const transformedInput: JobUpdateBodyWithNull = {
        ...input,
        ...allValues,
        startDate: input.startDate
          ? dayjs(input.startDate).toISOString()
          : input.startDate,
        endDate: input.endDate
          ? dayjs(input.endDate).toISOString()
          : input.endDate,
      };

      if (areObjectLeftKeysEqual(transformedInput, job)) {
        onSave();
        return;
      }
      transformedInput.id = jobId;
      return updateJob(transformedInput as Inputs, onSave);
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
        {...errorHandledRegister("title")}
      />
      <TextAreaWithLabel
        defaultValue={job.description}
        label="Description"
        placeholder="Job description"
        {...errorHandledRegister("description")}
      />
      <FieldWithLabel label="Location">
        <Controller
          name="location"
          control={control}
          defaultValue={job.location}
          render={({ field }) => (
            <LocationSelect value={field.value} onChange={field.onChange} />
          )}
        />
      </FieldWithLabel>
      <HStack w={"full"} gap={4}>
        <InputWithLabel
          type="datetime-local"
          defaultValue={
            job.startDate ? dayjs(job.startDate).format("YYYY-MM-DDTHH:mm") : ""
          }
          label="Start Date"
          {...errorHandledRegister("startDate")}
        />
        <InputWithLabel
          type="datetime-local"
          defaultValue={
            job.endDate ? dayjs(job.endDate).format("YYYY-MM-DDTHH:mm") : ""
          }
          label="End Date"
          {...errorHandledRegister("endDate")}
        />
      </HStack>
      {/* <HStack w={"full"} justifyContent="space-between" alignItems={"center"}>
        <FieldWithLabel label="Operator">
          <OperatorSelect
            clearable={false}
            onChange={(id) => setValue("assignedTo", id ?? undefined)}
            defaultValue={job.assignedTo}
          />
        </FieldWithLabel>
        <FieldWithLabel label="Client">
          <ClientSelect
            onChange={(id) => setValue("assignedClient", id ?? undefined)}
            defaultValue={job.assignedClient || 0}
          />
        </FieldWithLabel>
      </HStack> */}

      <JobStatusStep
        onChange={(status) => setValue("status", status)}
        defaultStatus={job.status}
      />
    </FormTemplate>
  );
}
