import { Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import React from "react";
import { QueryCacheKey } from "@/app/queryClient";
import { useUserRole } from "@/atoms/userAtom";
import Calendar from "@/components/block/Calendar/EventCalendar";
import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import { OutlineIconButton } from "@/components/buttons/Button";
import RefreshButton from "@/components/buttons/RefreshButton";
import PageContainer from "@/components/container/PageContainer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { setQueryDataIfNotExist } from "@/lib/apiClient";
import { useJobListLoading } from "../atoms";
import JobCreateModalTrigger from "../components/JobCreateModalTrigger";
import { JobStatusBadge } from "../components/JobStatusBadge";
import useJobList, { type JobEventCalendar } from "../hooks/useJobList";
import { useJobModal } from "../hooks/useJobModal";
import { getJobsListKey, updateJob } from "../query";

function ToolBar() {
  const role = useUserRole();
  const isLoading = useJobListLoading();

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
          <RefreshButton isLoading={isLoading} queryKey={getJobsListKey()} />
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
      overflowY={"hidden"}
    >
      <Heading size={"sm"}>{job.title}</Heading>

      <HStack justifyContent={"right"}>
        <JobStatusBadge status={job.status} />
      </HStack>
    </VStack>
  );
}

function JobList() {
  const { openJob, JobEdit } = useJobModal();

  return (
    <>
      <JobListCalendar openJob={openJob} />
      <JobEdit />
    </>
  );
}

type JobListCalendarProps = {
  openJob: (id: number) => void;
};

const JobListCalendar = React.memo(({ openJob }: JobListCalendarProps) => {
  const isMobile = useIsMobile();
  const role = useUserRole();
  const { jobs, setPeriod } = useJobList();

  return (
    <Calendar
      isOneDay={isMobile}
      isReadOnly={role !== "admin"}
      onEventUpdate={(index, startDate, endDate) => {
        updateJob({
          id: jobs[index].extendedProps.id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        });
      }}
      renderEvent={(event: JobEventCalendar) => (
        <JobEvent job={event.extendedProps} />
      )}
      events={jobs}
      onEventClick={(event) => {
        setQueryDataIfNotExist(
          [QueryCacheKey.Job, event.extendedProps.id],
          event.extendedProps
        );
        openJob(event.extendedProps.id);
      }}
      onDateSet={(arg) =>
        setPeriod({
          start: dayjs(arg.start),
          end: dayjs(arg.end),
        })
      }
    />
  );
});

export default function JobListPage() {
  return (
    <PageContainer>
      <ToolBar />
      <Flex maxH={"100%"} w={"100%"}>
        <JobList />
      </Flex>
    </PageContainer>
  );
}
