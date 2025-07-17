import { Flex, Heading, HStack, useDialog, VStack } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useUserRole } from "@/atoms/userAtom";
import Calendar from "@/components/block/Calendar/EventCalendar";
import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import {
  DialogContent,
  IconButtonDialog,
} from "@/components/dialog/ButtonDialog";
import JobCreateForm from "../components/JobCreateForm";
import JobDialogContent from "../components/JobDialogContent";
import { JobStatusBadge } from "../components/JobStatusBadge";
import useJobList, { type JobEventCalendar } from "../hooks/useJobList";
import { updateJob } from "../query";

function ToolBar() {
  const dialogState = useDialog();
  const role = useUserRole();

  return (
    <PageTitleWithToolbar
      title="Jobs"
      toolbar={
        role === "admin" ? (
          <IconButtonDialog dialogState={dialogState} icon={<Plus />}>
            <JobCreateForm onCreated={() => dialogState.setOpen(false)} />
          </IconButtonDialog>
        ) : undefined
      }
    />
  );
}

function JobEvent({ job }: { job: JobModel.Job }) {
  return (
    <VStack
      cursor={"pointer"}
      h={"full"}
      p={2}
      alignItems={"left"}
      justifyContent={"space-between"}
    >
      <Heading size={"sm"}>{job.title}</Heading>

      <HStack justifyContent={"right"}>
        <JobStatusBadge status={job.status} />
      </HStack>
    </VStack>
  );
}

function JobListCalendar() {
  const { jobs, setPeriod } = useJobList();

  const role = useUserRole();

  const dialog = useDialog();

  const [jobId, setJobId] = useState<number | null>(null);

  const openJobDialog = (id: number) => {
    setJobId(id);
    dialog.setOpen(true);
  };

  return (
    <>
      <Calendar
        isReadOnly={role !== "admin"}
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
          openJobDialog(event.extendedProps.id);
        }}
        onDateSet={(arg) =>
          setPeriod({
            start: dayjs(arg.start),
            end: dayjs(arg.end),
          })
        }
      />
      <DialogContent dialogState={dialog}>
        {jobId && (
          <JobDialogContent
            jobId={jobId}
            onSave={() => dialog.setOpen(false)}
          />
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
