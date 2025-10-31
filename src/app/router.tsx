import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminDashboardSettings from "@/features/admin/pages/AdminDashboardSettings";
import AdminInvoices from "@/features/admin/pages/AdminInvoices";
import AdminUsersList from "@/features/admin/pages/AdminUsersList";
import { Login } from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import AuthGuard from "@/features/guard/AuthGuard";
import RoleGuard from "@/features/guard/RoleGuard";
import JobList from "@/features/jobs/pages/JobList";
import JobPage from "@/features/jobs/pages/JobPage";
import PricingModelsListPage from "@/features/pricing-model/pages/PricingModelsListPage";
import { RootContainer } from "@/features/Root";
import Profile from "@/features/user/pages/Profile";
import Settings from "@/features/user/pages/Settings";

const AdminDashboard = lazy(
  () => import("@/features/admin/pages/AdminDashboard")
);

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootContainer />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/private/profile"} />,
      },
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
              {
                path: "pricing-models",
                element: <PricingModelsListPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
