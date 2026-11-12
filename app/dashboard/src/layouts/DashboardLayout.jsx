import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  // useAuth,
} from "@clerk/clerk-react";
import React from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../components/Footer";
import "../dashboard.css";
import ClerkAxiosProvider from "../components/ClerkAxiosProvider";

const DashboardLayout = () => {
  // const { getToken, orgId, isLoaded, isSignedIn } = useAuth();
  /**
   * New Production
   */
  // useEffect(() => {
  //   if (!isLoaded || !isSignedIn) return;

  //   const detach = attachClerkInterceptor(getToken);

  //   return () => {
  //     detach();
  //   };

  // }, [isLoaded, isSignedIn, getToken]);

  // if (!isLoaded) {
  //   return <div>Loading authentication...</div>;
  // }

  // if (!isSignedIn) {
  //   return <div>Please sign in.</div>;
  // }

  // if (!orgId) {
  //   return <div>Select an organization.</div>;
  // }

  return (
    <ClerkAxiosProvider>
      <ScrollRestoration />

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="dashboard-container">
          <Outlet />
          <Footer />
        </div>
      </SignedIn>
    </ClerkAxiosProvider>
  );
};
export default React.memo(DashboardLayout);
