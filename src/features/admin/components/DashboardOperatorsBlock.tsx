import { Table } from "@chakra-ui/react";
import { Phone } from "lucide-react";
import { QueryCacheKey } from "@/app/queryClient";
import { OutlineButton } from "@/components/buttons/Button";
import RefreshButton from "@/components/buttons/RefreshButton";
import { DashboardBlock } from "@/features/dashboard/components/DashboardBlock";
import { useAdminDashboardSettingsValue } from "../hooks/useAdminDashboardBlock";
import useOperators from "../hooks/useOperators";

type DashboardOperatorsBlockProps = {
  title: string;
};

export default function DashboardOperatorsBlock({
  title,
}: DashboardOperatorsBlockProps) {
  const settings = useAdminDashboardSettingsValue("operatorsNotSeen");
  const { operators, isLoading } = useOperators({
    refetchInterval: settings.refreshIntervalInMilliseconds,
  });

  if (settings.hidden) {
    return null;
  }

  return (
    <DashboardBlock
      isLoading={isLoading}
      dataAvailable={operators.length > 0}
      title={title}
      toolbar={<RefreshButton queryKey={[QueryCacheKey.OperatorList]} />}
    >
      <Table.ScrollArea
        borderWidth="1px"
        rounded="md"
        h={"full"}
        borderTopRadius={0}
      >
        <Table.Root size="sm" stickyHeader>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {operators.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  {item.firstName} {item.lastName}
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <OutlineButton
                    as="a"
                    onClick={() => {
                      window.location.href = `tel:${item.phone}`;
                    }}
                  >
                    <Phone /> Call
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
