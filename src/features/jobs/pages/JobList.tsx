import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import {
  DialogContent,
  IconButtonDialog,
} from "@/components/dialog/ButtonDialog";
import { Plus } from "lucide-react";
import Calendar from "@/components/block/Calendar/EventCalendar";
import { Flex, Heading, HStack, useDialog, VStack } from "@chakra-ui/react";
import { useState } from "react";
import type { JobModel } from "backend/modules/job/model";
import JobCreateForm from "../components/JobCreateForm";
import { Jobtabs } from "../components/JobEditForm";
import { JobStatusBadge } from "../components/JobStatusBadge";
import useJobList, { type JobEventCalendar } from "../hooks/useJobList";
import { updateJob } from "../query";

function ToolBar() {
  const dialogState = useDialog();

  return (
    <PageTitleWithToolbar
      title="Jobs"
      toolbar={
        <IconButtonDialog dialogState={dialogState} icon={<Plus />}>
          <JobCreateForm onCreated={() => dialogState.setOpen(false)} />
        </IconButtonDialog>
      }
    />
  );
}

function JobEvent({ job }: { job: JobModel.Job }) {
  return (
    <VStack
      h={"full"}
      p={2}
      alignItems={"left"}
      justifyContent={"space-between"}
    >
      <Heading size={"sm"}>{job.title}</Heading>

      <HStack justifyContent={"right"}>
        <JobStatusBadge status={job.status as JobModel.JobStatusEnum} />
      </HStack>
    </VStack>
  );
}

function JobListCalendar() {
  const { jobs } = useJobList();

  const dialog = useDialog();

  const [jobId, setJobId] = useState<number | null>(null);

  return (
    <>
      <Calendar
        onEventUpdate={(index, startDate, endDate) => {
          const start = startDate.toISOString();
          const end = endDate.toISOString();

          updateJob({
            id: jobs[index].extendedProps.id,
            startDate: start,
            endDate: end,
          });
        }}
        renderEvent={(event: JobEventCalendar) => (
          <JobEvent job={event.extendedProps} />
        )}
        events={jobs}
        onEventClick={(event) => {
          dialog.setOpen(true);
          setJobId(event.extendedProps.id);
        }}
      />
      <DialogContent dialogState={dialog}>
        {jobId && (
          <Jobtabs onSave={() => dialog.setOpen(false)} jobId={jobId} />
        )}
      </DialogContent>
    </>
  );
}

export default function JobListPage() {
  return (
    <PageContainer>
      <ToolBar />
      <Flex maxH={"100%"} w={"100%"}>
        <JobListCalendar />
      </Flex>
    </PageContainer>
  );
}
