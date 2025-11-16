import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Settings from "./pages/Settings";
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
            element: <Navigate to="settings" />,
          },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

export default router;
