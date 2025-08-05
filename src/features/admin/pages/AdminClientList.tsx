import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";

export default function AdminClientList() {
  return (
    <PageContainer>
      <PageTitleWithToolbar
        title="Clients"
        // toolbar={<OperatorCreateDialogTrigger />}
      />
      {/* {operators.map((operator) => (
        <UserCard key={operator.id} {...operator} />
      ))} */}
    </PageContainer>
  );
}
