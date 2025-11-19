import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./layouts/RootLayout";
import { EditSettingsPage } from "./pages/EditSettings";
import { SettingsRoute } from "./pages/Settings";
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
            element: <Navigate to="home" />,
          },
          {
            path: "home",
            element: <div>Home Page</div>,
          },

          {
            path: "settings",
            ...SettingsRoute,
          },
          { path: ":id/edit", ...EditSettingsPage },
        ],
      },
    ],
  },
]);

export default router;
