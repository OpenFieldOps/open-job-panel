import { useIsUserConnected } from "@/atoms/userAtom";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const isUserConnected = useIsUserConnected();
  if (isUserConnected) return <Outlet />;
  return <Navigate to={"/login"} />;
}
