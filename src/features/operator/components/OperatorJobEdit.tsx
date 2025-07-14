import {
  Box,
  Heading,
  Input,
  Separator,
  Spinner,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import { Eye, Folder, SquareCheck } from "lucide-react";
import { type UseFormSetValue, useForm } from "react-hook-form";
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

  const onSubmit = handleSubmit((data) => {
    console.log("Submitting job data:", data);
  });

  if (isLoading) return <Spinner />;
  if (!job?.id) return <div>Job not found</div>;
  return (
    <FormTemplate title={job.title} confirmText="Save" onSubmit={onSubmit}>
      <Tabs.Root defaultValue="overview" w={"full"}>
        <Tabs.List justifyContent={"center"}>
          <Tabs.Trigger value="overview">
            <Eye />
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger value="documents">
            <Folder />
            Documents
          </Tabs.Trigger>
          <Tabs.Trigger value="tasks">
            <SquareCheck />
            Tasks
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview" justifyContent={"center"}>
          <OverviewTab
            setValue={setValue}
            job={job}
            description={job.description}
          />
        </Tabs.Content>
        <Tabs.Content value="documents">
          <DocumentsTab />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <TasksTab />
        </Tabs.Content>
      </Tabs.Root>
    </FormTemplate>
  );
}

type OverviewTabProps = {
  job: JobModel.Job;
  setValue: UseFormSetValue<Inputs>;
  description?: string;
};

function OverviewTab({
  job: { status, location },
  setValue,
  description,
}: OverviewTabProps) {
  return (
    <VStack gap={4}>
      {description && (
        <Box w={"full"}>
          <Heading size={"md"}>Description</Heading>
          <Text fontSize={"md"}>{description}</Text>
        </Box>
      )}
      {location && <Input defaultValue={location} disabled />}
      <Separator w={"full"} />

      <JobStatusStep
        defaultStatus={status}
        onChange={(status) => setValue("status", status)}
      />
    </VStack>
  );
}

function DocumentsTab() {
  return <div>Documents related to the job</div>;
}

function TasksTab() {
  return <div>Tasks related to the job</div>;
}
