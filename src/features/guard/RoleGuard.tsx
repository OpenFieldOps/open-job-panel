import type { UserModel } from "backend/modules/user/UserModel";
import { Outlet } from "react-router-dom";
import { useUserIs } from "@/atoms/userAtom";

type RoleGuardProps = {
  userRole: UserModel.UserRole;
};

export default function RoleGuard({ userRole }: RoleGuardProps) {
  if (useUserIs(userRole)) return <Outlet />;
  return <div>Access Denied</div>;
}
