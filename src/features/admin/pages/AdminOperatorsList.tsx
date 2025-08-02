import { Button, Card, HStack } from "@chakra-ui/react";
import type { UserModel } from "backend/modules/user/model";
import { QueryCacheKey } from "@/app/queryClient";
import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import ConfirmAlertDialog from "@/components/dialog/ConfirmAlertDialog";
import { toaster } from "@/components/ui/contants";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { apiClient, apiQueryCacheListDelete, ok } from "@/lib/apiClient";
import { OperatorEditDialogTrigger } from "../../operator/components/OperatorEditForm";
import useOperators from "../hooks/useOperators";
import OperatorCreateDialogTrigger from "@/features/operator/components/OperatorDialogTrigger";

function deleteOperator(userId: number) {
  apiClient.user["assigned-users"]({
    userId,
  })
    .delete()
    .then((res) => {
      if (ok(res)) {
        apiQueryCacheListDelete([QueryCacheKey.OperatorList], userId);
        toaster.success({
          title: "Operator deleted successfully",
          description: "The operator has been removed from the list.",
        });
      } else {
        toaster.error({
          title: "Error deleting operator",
          description: "Failed to delete the operator. Please try again.",
        });
      }
    })
    .catch((error) => {
      console.error("Error deleting operator:", error);
      toaster.error({
        title: "Error",
        description:
          "An unexpected error occurred while deleting the operator.",
      });
    });
}

function UserCard({
  firstName,
  lastName,
  email,
  id,
  avatar,
}: UserModel.UserInfo) {
  return (
    <Card.Root variant="elevated" w={"full"}>
      <Card.Header>
        <HStack>
          <UserAvatar
            size={"md"}
            cursor={"pointer"}
            userInfo={{ firstName, lastName, avatar }}
          />
          <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Card.Description>
          <strong>Email:</strong> {email}
        </Card.Description>

        <HStack justifyContent={"flex-end"}>
          <ConfirmAlertDialog
            onConfirm={() => {
              deleteOperator(id);
            }}
          >
            <Button variant={"outline"} colorPalette={"red"}>
              Delete
            </Button>
          </ConfirmAlertDialog>
          <OperatorEditDialogTrigger>
            <Button variant={"outline"}>Edit</Button>
          </OperatorEditDialogTrigger>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}

export default function AdminOperatorsList() {
  const { operators } = useOperators();
  return (
    <PageContainer>
      <PageTitleWithToolbar
        title="Operators"
        toolbar={<OperatorCreateDialogTrigger />}
      />
      {operators.map((operator) => (
        <UserCard key={operator.id} {...operator} />
      ))}
    </PageContainer>
  );
}
