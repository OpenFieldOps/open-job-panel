import {
  Box,
  Heading,
  Input,
  Separator,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/JobModel";
import { useForm } from "react-hook-form";
import FormTemplate from "@/components/block/FormTemplate";
import { JobStatusStep } from "@/features/jobs/components/JobStatusStep";
import useJob from "@/features/jobs/hooks/useJob";
import { updateJob } from "@/features/jobs/query";

type OperatorJobEditFormProps = {
  jobId: number;
  onSave: () => void;
};

type Inputs = {
  status: JobModel.JobStatusString;
};

export default function OperatorJobEditForm({
  jobId,
  onSave,
}: OperatorJobEditFormProps) {
  const { job, isLoading } = useJob({ jobId });

  const { handleSubmit, setValue } = useForm<Inputs>();

  const onSubmit = handleSubmit((data) => {
    updateJob(
      {
        id: jobId,
        ...data,
      },
      onSave
    );
  });

  if (isLoading) return <Spinner />;
  if (!job?.id) return <div>Job not found</div>;
  return (
    <FormTemplate title={job.title} confirmText="Save" onSubmit={onSubmit}>
      <VStack gap={4} w={"full"}>
        {job.description && (
          <Box w={"full"}>
            <Heading size={"md"}>Description</Heading>
            <Text fontSize={"md"}>{job.description}</Text>
          </Box>
        )}
        {job.location ? (
          <Input defaultValue={job.location} disabled />
        ) : (
          <Text>No location specified</Text>
        )}
        <Separator w={"full"} />

        <JobStatusStep
          defaultStatus={job.status}
          onChange={(status) => setValue("status", status)}
        />
      </VStack>
    </FormTemplate>
  );
}
