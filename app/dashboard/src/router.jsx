import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { EditSettingsPage } from "./pages/EditSettings";
import { DashboardRoute } from "./pages/Dashboard";
import ErrorMessage from "./pages/ErrorMessage";
import { CreateSettingsPage } from "./pages/CreateChatBox";
<<<<<<< HEAD
import PricingScreen from './pages/PricingTable';
=======
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import { OrgRedirect } from "./components/OrgRedirect.jsx";
>>>>>>> develop

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorMessage />,
    children: [
      {
<<<<<<< HEAD
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
          { path: ":id/edit_settings", ...EditSettingsPage },
          { path: "create_settings", ...CreateSettingsPage },
          {path: "pricing", element: <PricingScreen />},
        ],
=======
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
>>>>>>> develop
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
