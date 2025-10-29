import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/JobModel";
import dayjs from "dayjs";
import React, { useState } from "react";
import { BuildQueryCacheKey, QueryCacheKey } from "@/app/queryClient";
import { useUserIsNot } from "@/atoms/userAtom";
import Calendar from "@/components/block/Calendar/EventCalendar";
import AddButton from "@/components/buttons/AddButton";
import RefreshButton from "@/components/buttons/RefreshButton";
import PageContainer from "@/components/container/PageContainer";
import { WithRole } from "@/features/guard/WithRole";
import OperatorSelect from "@/features/operator/components/OperatorSelect";
import { useIsMobile } from "@/hooks/useIsMobile";
import { setQueryDataIfNotExist } from "@/lib/apiClient";
import JobCreateModalTrigger from "../components/JobCreateModalTrigger";
import { JobStatusBadge } from "../components/JobStatusBadge";
import useJobList, { type JobEventCalendar } from "../hooks/useJobList";
import { useJobModal } from "../hooks/useJobModal";
import { getJobsListKey, updateJob } from "../query";

function JobCard({ job }: { job: JobModel.Job }) {
  return (
    <VStack
      cursor="pointer"
      h="full"
      p={2}
      alignItems="left"
      justifyContent="space-between"
      overflowY="hidden"
    >
      <VStack alignItems="left" gap={2} h="full">
        <Heading size="sm">{job.title}</Heading>
        <Text fontSize="sm" color="gray.300">
          {job.description || "No description provided."}
        </Text>
      </VStack>
      <HStack justifyContent="flex-end">
        <JobStatusBadge status={job.status} />
      </HStack>
    </VStack>
  );
}

type JobCalendarProps = {
  jobs: JobEventCalendar[];
  setPeriod: (period: { start: dayjs.Dayjs; end: dayjs.Dayjs }) => void;
  onJobClick: (jobId: number) => void;
};

const JobCalendar = React.memo(
  ({ onJobClick, jobs, setPeriod }: JobCalendarProps) => {
    const isMobile = useIsMobile();
    const isNotAdmin = useUserIsNot("admin");

    return (
      <Calendar
        displayDate={!isMobile}
        rightToolbar={
          <WithRole.admin>
            <JobCreateModalTrigger>
              <AddButton />
            </JobCreateModalTrigger>
          </WithRole.admin>
        }
        isOneDay={isMobile}
        isReadOnly={isNotAdmin}
        events={jobs}
        renderEvent={(event: JobEventCalendar) => {
          return <JobCard job={event.extendedProps} />;
        }}
        onEventClick={(event) => {
          setQueryDataIfNotExist(
            BuildQueryCacheKey(QueryCacheKey.Job, event.extendedProps.id),
            event.extendedProps
          );
          onJobClick(event.extendedProps.id);
        }}
        onEventUpdate={(index, startDate, endDate) => {
          updateJob({
            id: jobs[index].extendedProps.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          });
        }}
        onDateSet={({ start, end }) => {
          setPeriod({ start: dayjs(start), end: dayjs(end) });
        }}
      />
    );
  }
);

export default function JobListPage() {
  const { openJob, JobEdit } = useJobModal();
  const { jobs, setPeriod } = useJobList();
  const [selectedOperator, setSelectedOperator] = useState<number | null>(null);

  const filteredJobs = selectedOperator
    ? jobs.filter((job) => job.extendedProps.assignedTo === selectedOperator)
    : jobs;

  return (
    <PageContainer
      toolbar={{
        title: "Jobs",
        noTitleOnMobile: true,
        toolbar: (
          <HStack maxW={"250px"} justifyContent={"flex-end"}>
            <WithRole.admin>
              <OperatorSelect
                onChange={setSelectedOperator}
                inputProps={{
                  placeholder: "Select Operator",
                }}
              />
            </WithRole.admin>

            <RefreshButton queryKey={getJobsListKey()} />
          </HStack>
        ),
      }}
    >
      <JobCalendar
        onJobClick={openJob}
        jobs={filteredJobs}
        setPeriod={setPeriod}
      />
      {JobEdit}
    </PageContainer>
  );
}
