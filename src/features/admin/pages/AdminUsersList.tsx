import { Button, Menu, SimpleGrid } from "@chakra-ui/react";
import type { UserModel } from "backend/modules/user/model";
import { ChevronDown } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import { EmptyWrapperAction } from "@/components/container/EmptyWrapper";
import PageContainer from "@/components/container/PageContainer";
import { UserCard } from "@/features/user/components/UserCard";
import {
  UserCreateDialogButtonTrigger,
  UserCreateDialogIconButtonTrigger,
} from "@/features/user/components/UserCreateDialogTrigger";
import AdminUserCardToolbar from "../components/AdminUserCardToolbar/AdminUserCardToolbar";
import useAssignedUsers from "../hooks/useAssignedUsers";

const titleMap: Record<string, string> = {
  operator: "Operators",
  client: "Clients",
  supervisor: "Supervisors",
};

const userRoles: Array<{ key: UserModel.AssignedUserRole; label: string }> = [
  { key: "operator", label: "Operators" },
  { key: "client", label: "Clients" },
  { key: "supervisor", label: "Supervisors" },
];

function UserRoleNavigationMenu({ currentRole }: { currentRole?: string }) {
  const navigate = useNavigate();

  const currentRoleLabel =
    userRoles.find((role) => role.key === currentRole)?.label || "Select Role";

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" mb={4}>
          {currentRoleLabel} <ChevronDown />
        </Button>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content>
          {userRoles.map(({ key, label }) => (
            <Menu.Item
              key={key}
              value={key}
              onClick={() => navigate(`/private/admin/users/${key}`)}
            >
              <Menu.ItemText>{label}</Menu.ItemText>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}

export default function AdminUsersList() {
  const { role } = useParams<{ role: UserModel.AssignedUserRole }>();

  const { users, isLoading } = useAssignedUsers({
    role: role || "operator",
  });

  if (isLoading) {
    return (
      <PageContainer>
        <div>Loading...</div>
      </PageContainer>
    );
  }

  if (!role) {
    return <Navigate to="/private/admin/users/operator" replace />;
  }

  return (
    <PageContainer>
      <PageTitleWithToolbar
        title={titleMap[role]}
        toolbar={
          <>
            <UserRoleNavigationMenu currentRole={role} />
            <UserCreateDialogIconButtonTrigger userRole={role} />
          </>
        }
      />
      <SimpleGrid
        w={"full"}
        columns={{ base: 1, md: users.length > 0 ? 2 : 1 }}
        gap={4}
      >
        <EmptyWrapperAction
          list={users}
          render={(user) => (
            <UserCard
              key={user.id}
              {...user}
              toolbar={<AdminUserCardToolbar user={user} />}
            />
          )}
          title="No users found"
          description={`No ${titleMap[role]} available.`}
        >
          <UserCreateDialogButtonTrigger userRole={role} />
        </EmptyWrapperAction>
      </SimpleGrid>
    </PageContainer>
  );
}
