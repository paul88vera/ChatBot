import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
  useOrganization,
} from "@clerk/clerk-react";
import React, { useEffect } from "react";
import {
  Outlet,
  ScrollRestoration,
  useNavigate,
  useParams,
} from "react-router";
import { attachClerkInterceptor } from "../api/base";
import Footer from "../components/Footer";

const RootLayout = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    attachClerkInterceptor(getToken);
  }, [getToken]);

  const { organization } = useOrganization();
  const { orgId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (organization && organization.id && !orgId) {
      // Redirect to URL with orgId
      navigate(`/${organization.id}/dashboard`, { replace: true });
    }
  }, [organization, orgId, navigate]);
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
export default React.memo(RootLayout);
