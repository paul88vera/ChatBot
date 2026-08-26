import { SignedIn, SignedOut, RedirectToSignIn, useAuth, } from "@clerk/clerk-react"; 
import React, { useEffect } from "react"; 
import { Outlet, ScrollRestoration, } from "react-router";
import Footer from "../components/Footer"; 
import '../dashboard.css';

const DashboardLayout = () => {
    const {
  getToken,
  isLoaded,
  isSignedIn,
} = useAuth();

/* Development */
useEffect(() => {
  // if (!isLoaded || !isSignedIn) return;

  async function testToken() {
    try {
      const token = await getToken();

      console.log("=== CLERK TOKEN TEST ===");
      console.log("Token exists:", !!token);
      console.log("Token length:", token?.length);
    } catch (error) {
      console.error("getToken failed:", error);
    }
  }

  testToken();
}, [getToken]);

/* Production */
// useEffect(() => {
//   if (!isLoaded || !isSignedIn) return;

//   console.log("DashboardLayout: installing Clerk interceptor");

//   const detach = attachClerkInterceptor(getToken);

//   return detach;
// }, [getToken, isLoaded, isSignedIn]);


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