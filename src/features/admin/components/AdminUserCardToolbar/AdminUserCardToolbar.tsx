import { Button, HStack } from "@chakra-ui/react";
import type { UserModel } from "backend/modules/user/model";
import type React from "react";
import { QueryCacheKey } from "@/app/queryClient";
import ConfirmAlertDialog from "@/components/dialog/ConfirmAlertDialog";
import { toaster } from "@/components/ui/contants";
import { apiClient, apiQueryCacheListDelete, ok } from "@/lib/apiClient";
import { AdminUserCardClientToolBar } from "./AdminUserCardClientToolBar";
import { AdminUserCardOperatorToolBar } from "./AdminUserCardOperatorToolBar";
import type { ReactNode } from "react";

type UserCardProps = {
  user: UserModel.UserInfo;
};

const roleToolbar: Record<UserModel.UserRole, React.FC<{ userId: number }>> = {
  operator: AdminUserCardOperatorToolBar,
  client: AdminUserCardClientToolBar,
  supervisor: (_: { userId: number }) => null,
  admin: (_: { userId: number }) => null,
};

export default function AdminUserCardToolbar({ user }: UserCardProps) {
  const UserToolbar = roleToolbar[user.role]({ userId: user.id }) as ReactNode;
  return (
    <HStack alignItems={"flex-end"}>
      <ConfirmAlertDialog
        onConfirm={() => {
          deleteUser(user.id, user.role as UserModel.AssignedUserRole);
        }}
      >
        <Button variant={"outline"} colorPalette={"red"}>
          Delete
        </Button>
      </ConfirmAlertDialog>
      {UserToolbar}
    </HStack>
  );
}

const roleQueryCacheKeyMap: Record<UserModel.AssignedUserRole, QueryCacheKey> =
  {
    operator: QueryCacheKey.OperatorList,
    client: QueryCacheKey.ClientList,
    supervisor: QueryCacheKey.SupervisorList,
  };

function deleteUser(userId: number, role: UserModel.AssignedUserRole) {
  apiClient.user["delete-assigned-users"]({
    userId,
  })
    .delete()
    .then((res) => {
      if (ok(res)) {
        apiQueryCacheListDelete([roleQueryCacheKeyMap[role]], userId);
        toaster.success({
          title: `${
            role.charAt(0).toUpperCase() + role.slice(1)
          } deleted successfully`,
          description: `The ${role} has been removed from the list.`,
        });
      } else {
        toaster.error({
          title: `Error deleting ${role}`,
          description: `Failed to delete the ${role}. Please try again.`,
        });
      }
    })
    .catch((error) => {
      console.error(`Error deleting ${role}:`, error);
      toaster.error({
        title: "Error",
        description: `An unexpected error occurred while deleting the ${role}.`,
      });
    });
}
