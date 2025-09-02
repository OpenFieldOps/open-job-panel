import { Navigate, Outlet } from "react-router-dom";
import { useIsUserAuthenticated } from "@/atoms/userAtom";

export default function AuthGuard() {
  return useIsUserAuthenticated() ? <Outlet /> : <Navigate to={"/login"} />;
}
