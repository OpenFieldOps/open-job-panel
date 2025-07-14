import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AdminOperatorsList from "@/features/admin/pages/AdminOperatorsList";
import { Login } from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import AuthGuard from "@/features/guard/AuthGuard";
import RoleGuard from "@/features/guard/RoleGuard";
import JobList from "@/features/jobs/pages/JobList";
import { RootContainer } from "@/features/Root";
import Profile from "@/features/user/pages/Profile";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootContainer />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "private",
        element: <AuthGuard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "jobs",
            element: <JobList />,
          },
          {
            path: "admin",
            element: <RoleGuard userRole="admin" />,
            children: [
              { path: "operators", element: <AdminOperatorsList /> },
              { path: "dashboard", element: <AdminDashboard /> },
            ],
          },
        ],
      },
    ],
  },
]);
