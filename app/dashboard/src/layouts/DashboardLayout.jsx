import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../components/Footer";
import "../dashboard.css";
import { attachClerkInterceptor } from "../api/base";

const DashboardLayout = () => {
  const { getToken, orgId, isLoaded, isSignedIn } = useAuth();

  /* Development */
  // useEffect(() => {
  //   if (!isLoaded || !isSignedIn) return;

  //   async function testToken() {
  //     try {
  //       const token = await getToken();

  //       console.log("=== CLERK TOKEN TEST ===");
  //       console.log("Token exists:", !!token);
  //       console.log("Token length:", token?.length);
  //     } catch (error) {
  //       console.error("getToken failed:", error);
  //     }
  //   }

  //   testToken();
  // }, [getToken]);

  /* Production */
  // useEffect(() => {
  //   if (!isLoaded || !isSignedIn) return;

  //   // async function tokenCheck() {
  //   //   try {
  //   //     const token = await getToken();

  //   //     console.log("DashboardLayout: installing Clerk interceptor");

  //   //     console.log("=== CLERK TOKEN TEST ===");
  //   //     console.log("Token exists:", !!token);
  //   //     console.log("Token length:", token?.length);
  //   //   } catch (error) {
  //   //     console.error("getToken failed:", error);
  //   //   }
  //   // }

  //   const detach = attachClerkInterceptor(getToken);

  //   return (detach);
  // }, [getToken, isLoaded, isSignedIn]);

  /**
   * New Production
   */
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const detach = attachClerkInterceptor(getToken);

    return () => {
      detach();
    };

  }, [isLoaded, isSignedIn, getToken]);

  if (!isLoaded) {
    return <div>Loading authentication...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in.</div>;
  }

  if (!orgId) {
    return <div>Select an organization.</div>;
  }

  return (
    <>
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
    </>
  );
};
export default React.memo(DashboardLayout);
