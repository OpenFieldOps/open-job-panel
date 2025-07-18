import {
  Box,
  Heading,
  Input,
  Separator,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import { useForm } from "react-hook-form";
import FormTemplate from "@/components/block/FormTemplate";
import { JobStatusStep } from "@/features/jobs/components/JobStatusStep";
import useJob from "@/features/jobs/hooks/useJob";

type OperatorJobEditFormProps = {
  jobId: number;
};

type Inputs = {
  status: JobModel.JobStatusString;
};

export default function OperatorJobEditForm({
  jobId,
}: OperatorJobEditFormProps) {
  const { job, isLoading } = useJob({ jobId });

  const { handleSubmit, setValue } = useForm<Inputs>();

  const onSubmit = handleSubmit(() => {});

  if (isLoading) return <Spinner />;
  if (!job?.id) return <div>Job not found</div>;
  return (
    <FormTemplate title={job.title} confirmText="Save" onSubmit={onSubmit}>
      <VStack gap={4}>
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
