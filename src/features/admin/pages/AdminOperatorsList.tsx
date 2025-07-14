import { Card, useDialog } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { UserModel } from "backend/modules/user/model";
import { Plus } from "lucide-react";
import { QueryCacheKey } from "@/app/queryClient";
import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import { IconButtonDialog } from "@/components/dialog/ButtonDialog";
import { apiClient } from "@/lib/apiClient";
import OperatorCreateForm from "../components/OperatorCreateForm";

function UserCard({ firstName, lastName, email }: UserModel.UserInfo) {
  return (
    <Card.Root variant="elevated" mb={4} p={4} w={"full"}>
      <Card.Header>
        <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
        <Card.Description>{email}</Card.Description>
      </Card.Header>
      <Card.Body>
        <Card.Description>
          {`Operator: ${firstName} ${lastName} (${email})`}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}

export default function AdminOperatorsList() {
  const dialog = useDialog();
  const { data: operators } = useQuery({
    queryKey: [QueryCacheKey.OperatorList],
    queryFn: () => apiClient.user["assigned-users"].get(),
  });
  return (
    <PageContainer>
      <PageTitleWithToolbar
        title="Operators"
        toolbar={
          <IconButtonDialog dialogState={dialog} icon={<Plus />}>
            <OperatorCreateForm
              onCreated={() => {
                dialog.setOpen(false);
              }}
            />
          </IconButtonDialog>
        }
      />
      {operators?.data?.map((operator) => (
        <UserCard key={operator.id} {...operator} />
      ))}
    </PageContainer>
  );
}
