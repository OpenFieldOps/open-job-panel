import { Navigate, Outlet } from "react-router-dom";
import { useIsUserAuthenticated } from "@/atoms/userAtom";

export default function AuthGuard() {
  const isUserAuthenticated = useIsUserAuthenticated();
  if (isUserAuthenticated) return <Outlet />;
  return <Navigate to={"/login"} />;
}
