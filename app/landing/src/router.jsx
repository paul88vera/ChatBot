import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./layouts/RootLayout";
import ErrorMessage from "./pages/ErrorMessage";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";

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
          // {
          //   path: "product",
          //   element: <Product />,
          // },
          // {
          //   path: "pricing",
          //   element: <Pricing />,
          // },
          
        ],
      },
    ],
  },
  {path: "*", element: <Navigate to="/" />,}
]);

export default router;
