import { Button, Card, useDialog } from "@chakra-ui/react";
import type { UserModel } from "backend/modules/user/model";
import { Plus } from "lucide-react";
import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import { IconButtonDialog } from "@/components/dialog/ButtonDialog";
import OperatorCreateForm from "../components/OperatorCreateForm";
import useOperators from "../hooks/useOperators";

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
      <Card.Footer justifyContent={"flex-end"}>
        <Button variant={"outline"}>Delete</Button>
        <Button variant={"outline"}>Edit</Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default function AdminOperatorsList() {
  const dialog = useDialog();
  const { operators } = useOperators();
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
      {operators.map((operator) => (
        <UserCard key={operator.id} {...operator} />
      ))}
    </PageContainer>
  );
}
