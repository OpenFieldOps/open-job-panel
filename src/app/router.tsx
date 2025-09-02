import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AdminDashboardSettings from "@/features/admin/pages/AdminDashboardSettings";
import AdminInvoices from "@/features/admin/pages/AdminInvoices";
import AdminUsersList from "@/features/admin/pages/AdminUsersList";
import { Login } from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import AuthGuard from "@/features/guard/AuthGuard";
import RoleGuard from "@/features/guard/RoleGuard";
import JobList from "@/features/jobs/pages/JobList";
import JobPage from "@/features/jobs/pages/JobPage";
import { RootContainer } from "@/features/Root";
import Profile from "@/features/user/pages/Profile";
import Settings from "@/features/user/pages/Settings";

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
            path: "settings",
            element: <Settings />,
          },
          {
            path: "jobs",
            element: <JobList />,
          },
          {
            path: "jobs/:jobId",
            element: <JobPage />,
          },
          {
            path: "admin",
            element: <RoleGuard userRole="admin" />,
            children: [
              { path: "users/:role", element: <AdminUsersList /> },
              { path: "dashboard", element: <AdminDashboard /> },
              {
                path: "dashboard-settings",
                element: <AdminDashboardSettings />,
              },
              {
                path: "invoices",
                element: <AdminInvoices />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
