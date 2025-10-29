import type { UserModel } from "backend/modules/user/UserModel";
import type { PropsWithChildren } from "react";
import { useUserIs } from "@/atoms/userAtom";

function WithRoleGuard(
  props: PropsWithChildren & { userRole: UserModel.UserRole }
) {
  if (useUserIs(props.userRole)) {
    return props.children;
  }
  return null;
}

export const WithRole = {
  operator(props: PropsWithChildren) {
    return (
      <WithRoleGuard userRole={"operator"}>{props.children}</WithRoleGuard>
    );
  },
  admin(props: PropsWithChildren) {
    return <WithRoleGuard userRole={"admin"}>{props.children}</WithRoleGuard>;
  },
};
