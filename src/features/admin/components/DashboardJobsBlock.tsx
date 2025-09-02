import { Table } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import { OutlineButton } from "@/components/buttons/Button";
import RefreshButton from "@/components/buttons/RefreshButton";
import { DashboardBlock } from "@/features/dashboard/components/DashboardBlock";
import { jobStatusInfoMap } from "@/features/jobs/constant";
import { useJobModal } from "@/features/jobs/hooks/useJobModal";
import { useJobQuery } from "@/features/jobs/hooks/useJobQuery";
import { useAdminDashboardSettingsValue } from "../hooks/useAdminDashboardBlock";

type DashboardJobsBlockProps = {
  query: Partial<JobModel.JobSelectQuery>;
  title: string;
};

export default function DashboardJobsBlock({
  query,
  title,
}: DashboardJobsBlockProps) {
  const settings = useAdminDashboardSettingsValue("jobs");
  const { jobs, isLoading, key } = useJobQuery(query, settings.refreshIntervalInMilliseconds);
  const { openJob, JobEdit } = useJobModal();

  if (settings.hidden) {
    return null;
  }

  return (
    <DashboardBlock
      isLoading={isLoading}
      dataAvailable={jobs.length > 0}
      title={title}
      toolbar={<RefreshButton queryKey={key} />}
    >
      {JobEdit}
      <Table.ScrollArea borderWidth="1px" h={"full"}>
        <Table.Root size="sm" stickyHeader>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {jobs.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>
                  {jobStatusInfoMap.get(item.status)?.title}
                </Table.Cell>

                <Table.Cell textAlign="end">
                  <OutlineButton onClick={() => openJob(item.id)}>
                    Open
                  </OutlineButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </DashboardBlock>
  );
}
