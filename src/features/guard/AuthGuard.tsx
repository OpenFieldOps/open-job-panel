import { useIsUserAuthenticated } from "@/atoms/userAtom";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const IsUserAuthenticated = useIsUserAuthenticated();
  if (IsUserAuthenticated) return <Outlet />;
  return <Navigate to={"/login"} />;
}
