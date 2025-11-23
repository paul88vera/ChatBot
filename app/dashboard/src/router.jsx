import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./layouts/RootLayout";
import { EditSettingsPage } from "./pages/EditSettings";
import { SettingsRoute } from "./pages/Dashboard";
import ErrorMessage from "./pages/ErrorMessage";

import { OrgRedirect } from "./components/OrgRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OrgRedirect />,
  },
  {
    path: ":id",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" />,
          },
          {
            path: "dashboard",
            ...SettingsRoute,
          },
          { path: ":id/settings", ...EditSettingsPage },
        ],
      },
    ],
  },
]);

export default router;
