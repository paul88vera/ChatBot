import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import React, { useEffect } from "react";
import {
  Outlet,
  ScrollRestoration,
} from "react-router";
import { attachClerkInterceptor } from "../api/base";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    attachClerkInterceptor(getToken);
  }, [getToken]);


  return (
    <>
      <ScrollRestoration />
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="container">
          <Outlet />
          <Footer />
        </div>
      </SignedIn>
    </>
  );
};
export default React.memo(DashboardLayout);
