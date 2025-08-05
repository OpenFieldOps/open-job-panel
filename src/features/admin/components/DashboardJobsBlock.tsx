import { Spinner, Table, Text } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import { DashboardBlock } from "@/components/block/Dashboard/DashboardBlocks/DashboardBlock";
import { OutlineButton } from "@/components/buttons/Button";
import RefreshButton from "@/components/buttons/RefreshButton";
import { useJobModal } from "@/features/jobs/hooks/useJobModal";
import { useJobQuery } from "@/features/jobs/hooks/useJobQuery";

type DashboardJobsBlockProps = {
  query: Partial<JobModel.JobSelectQuery>;
  title: string;
};

export default function DashboardJobsBlock({
  query,
  title,
}: DashboardJobsBlockProps) {
  const { jobs, isLoading, key } = useJobQuery(query);
  const { openJob, JobEdit } = useJobModal();

  if (isLoading) return <Spinner />;
  if (!jobs || jobs.length <= 0)
    return (
      <DashboardBlock
        p={2}
        title={title}
        toolbar={<RefreshButton queryKey={key} />}
      >
        <Text p={2}>No data available</Text>
      </DashboardBlock>
    );
  return (
    <DashboardBlock title={title} toolbar={<RefreshButton queryKey={key} />}>
      {JobEdit}
      <Table.ScrollArea borderWidth="1px" rounded="md" h={"full"}>
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
                <Table.Cell>{item.status}</Table.Cell>
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
