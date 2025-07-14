import type { UserModel } from "backend/modules/user/model";
import { Outlet } from "react-router-dom";
import { useUserRole } from "@/atoms/userAtom";

type RoleGuardProps = {
  role: UserModel.UserRole;
};

export default function RoleGuard({ role }: RoleGuardProps) {
  const userRole = useUserRole();
  if (userRole === role) return <Outlet />;
  return <div>Access Denied</div>;
}
