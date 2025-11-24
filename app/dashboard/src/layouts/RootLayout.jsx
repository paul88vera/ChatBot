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
  if (!organization || !organization.id) return;

  const currentOrgId = orgId;                 // from params
  const realOrgId = organization.id;          // from Clerk

  // If it's already correct, bail
  if (currentOrgId === realOrgId) return;

  // Rewrite the path but keep everything after the org segment
  const parts = location.pathname.split("/").filter(Boolean);

  // Replace first segment with real orgId
  const newPath = `/${realOrgId}/${parts.slice(1).join("/")}`;

  navigate(newPath, { replace: true });
}, [organization, orgId, location.pathname, navigate]);


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
