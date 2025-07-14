import type { UserModel } from "backend/modules/user/model";
import { Outlet } from "react-router-dom";
import { useUserRole } from "@/atoms/userAtom";

type RoleGuardProps = {
  userRole: UserModel.UserRole;
};

export default function RoleGuard({ userRole }: RoleGuardProps) {
  const userRoleFetched = useUserRole();
  if (userRole === userRoleFetched) return <Outlet />;
  return <div>Access Denied</div>;
}
