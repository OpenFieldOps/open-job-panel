import { Login } from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import AuthGuard from "@/features/guard/AuthGuard";
import JobList from "@/features/jobs/pages/JobList";
import { RootContainer } from "@/features/Root";
import Profile from "@/features/user/pages/Profile";
import { createBrowserRouter } from "react-router-dom";

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
        ],
      },
    ],
  },
]);
