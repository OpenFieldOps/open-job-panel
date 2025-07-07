import { Login } from "@/features/auth/pages/Login";
import AuthGuard from "@/features/guard/AuthGuard";
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
        path: "private",
        element: <AuthGuard />,
        children: [
          {
            path: "user/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
