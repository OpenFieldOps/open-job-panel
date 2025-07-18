import { Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { useUserRole } from "@/atoms/userAtom";
import Calendar from "@/components/block/Calendar/EventCalendar";
import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import { OutlineIconButton } from "@/components/buttons/Button";
import RefreshButton from "@/components/buttons/RefreshButton";
import PageContainer from "@/components/container/PageContainer";
import JobCreateModalTrigger from "../components/JobCreateModalTrigger";
import { JobStatusBadge } from "../components/JobStatusBadge";
import useJobList, { type JobEventCalendar } from "../hooks/useJobList";
import { useJobModal } from "../hooks/useJobModal";
import { getJobsListKey, updateJob } from "../query";

function ToolBar() {
  const role = useUserRole();

  return (
    <PageTitleWithToolbar
      title="Jobs"
      toolbar={
        <HStack gap={3}>
          {role === "admin" ? (
            <JobCreateModalTrigger>
              <OutlineIconButton>
                <Plus />
              </OutlineIconButton>
            </JobCreateModalTrigger>
          ) : undefined}
          <RefreshButton queryKey={getJobsListKey()} />
        </HStack>
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

  const { openJob, modal } = useJobModal();

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
          openJob(event.extendedProps.id);
        }}
        onDateSet={(arg) =>
          setPeriod({
            start: dayjs(arg.start),
            end: dayjs(arg.end),
          })
        }
      />
      {modal}
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
