import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { EditSettingsPage } from "./pages/EditSettings";
import { DashboardRoute } from "./pages/Dashboard";
import ErrorMessage from "./pages/ErrorMessage";
import { CreateSettingsPage } from "./pages/CreateChatBox";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import { OrgRedirect } from "./components/OrgRedirect.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
    ],
  },
  {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <OrgRedirect />,
    },
    {
      path: ":orgId",
      ...DashboardRoute,
    },
    {
      path: ":orgId/edit_settings",
      ...EditSettingsPage,
    },
    {
      path: ":orgId/create_settings",
      ...CreateSettingsPage,
    },
  ],
},
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
