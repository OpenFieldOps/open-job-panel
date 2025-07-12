import { useIsUserAuthenticated } from "@/atoms/userAtom";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const isUserAuthenticated = useIsUserAuthenticated();
  if (isUserAuthenticated) return <Outlet />;
  return <Navigate to={"/login"} />;
}
