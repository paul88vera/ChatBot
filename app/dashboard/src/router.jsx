import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { EditSettingsPage } from "./pages/EditSettings";
import Dashboard, { SettingsRoute } from "./pages/Dashboard";
import ErrorMessage from "./pages/ErrorMessage";
// import { OrgRedirect } from "./components/OrgRedirect"; // only for dashboard
import { CreateSettingsPage } from "./pages/CreateChatBox";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "product",
            element: <Product />,
          },
          {
            path: "pricing",
            element: <Pricing />,
          },
          // {
          //   path: "dashboard",
          //   ...SettingsRoute,
          // },
          // { path: ":id/edit_settings", ...EditSettingsPage },
          // { path: "create_settings", ...CreateSettingsPage },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="dashboard" /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          {
            index: true,
            ...SettingsRoute,
          },
          { path: "edit_settings", ...EditSettingsPage },
          { path: "create_settings", ...CreateSettingsPage },
        ],
      },
    ],
  },
]);

export default router;
