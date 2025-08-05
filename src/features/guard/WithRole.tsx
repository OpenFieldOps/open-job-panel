import { UserModel } from "backend/modules/user/model";
import type { PropsWithChildren } from "react";
import { useUserIs } from "@/atoms/userAtom";

function WithRoleGuard(
  props: PropsWithChildren & { role: UserModel.UserRoleEnum }
) {
  if (useUserIs(props.role)) {
    return props.children;
  }
  return null;
}

export const WithRole = {
  operator(props: PropsWithChildren) {
    return (
      <WithRoleGuard role={UserModel.UserRoleEnum.operator}>
        {props.children}
      </WithRoleGuard>
    );
  },
  admin(props: PropsWithChildren) {
    return (
      <WithRoleGuard role={UserModel.UserRoleEnum.admin}>
        {props.children}
      </WithRoleGuard>
    );
  },
};
