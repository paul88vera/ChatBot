import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider } from "react-router";
import ClerkAxiosProvider from "./components/ClerkAxiosProvider";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkAxiosProvider>
      <RouterProvider router={router} />
      </ClerkAxiosProvider>
    </ClerkProvider>
  </StrictMode>
);
