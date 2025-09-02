import {
  Button,
  Card,
  Heading,
  HStack,
  Spinner,
  useDialog,
  VStack,
} from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import type { PropsWithChildren } from "react";
import { ListWrapper } from "@/components/container/EmptyWrapper";
import { TriggeredDialog } from "@/components/dialog/ButtonDialog";
import { JobStatusStep } from "@/features/jobs/components/JobStatusStep";
import { useJobModal } from "@/features/jobs/hooks/useJobModal";
import useOperatorJobList from "@/features/jobs/hooks/useOperatorJobList";

type AdminOperatorJobsModalProps = {
  operatorId: number;
};

export default function AdminOperatorJobsModal({
  operatorId,
  children,
}: AdminOperatorJobsModalProps & PropsWithChildren) {
  const dialogState = useDialog();

  return (
    <TriggeredDialog dialogState={dialogState} trigger={children}>
      <OperatorJobList operatorId={operatorId} />
    </TriggeredDialog>
  );
}

function OperatorJobList({ operatorId }: AdminOperatorJobsModalProps) {
  const { jobs, isLoading } = useOperatorJobList({
    operatorId,
  });
  const { openJob, JobEdit } = useJobModal();

  return (
    <VStack w={"full"} h={"full"} gap={4} p={4}>
      <Heading size={"md"}>Assigned Active Jobs</Heading>
      {JobEdit}
      <VStack overflowY={"scroll"} maxH={"47vh"} w={"full"} gap={2}>
        {isLoading && <Spinner />}
        <ListWrapper
          list={jobs}
          render={(job) => <JobCard key={job.id} {...job} openJob={openJob} />}
        >
          <Heading size={"sm"} textAlign={"center"}>
            No active jobs assigned to this operator.
          </Heading>
        </ListWrapper>
      </VStack>
    </VStack>
  );
}

type JobCardProps = JobModel.Job & {
  openJob: (jobId: number) => void;
};

function JobCard({ openJob, ...job }: JobCardProps) {
  return (
    <Card.Root w={"full"}>
      <Card.Body gap={4}>
        <Card.Title>{job.title}</Card.Title>
        <JobStatusStep defaultStatus={job.status} />
        <HStack justifyContent={"flex-end"} w={"full"}>
          <Button onClick={() => openJob(job.id)}>Open Job</Button>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
