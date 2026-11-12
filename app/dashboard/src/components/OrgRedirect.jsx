import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrganization, useUser } from "@clerk/clerk-react";

export function OrgRedirect() {
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { isLoaded: userLoaded, user } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
  if (!userLoaded || !orgLoaded) {
    console.log("Waiting for Clerk to load...");
    return;
  }

  if (!user) {
    console.log("No user → redirecting to sign-in");
    navigate("/sign-in", { replace: true });
    return;
  }

  if (!organization) {
    console.log("No active organization → redirecting to no-organization");
    navigate("/no-organization", { replace: true });
    return;
  }


  const pathname = location.pathname.replace(/\/$/, "");

if (pathname !== "/dashboard") {
  console.log("Not dashboard index → doing nothing");
  return;
}

navigate(`/dashboard/${organization.id}`, {
  replace: true,
});


  navigate(`/dashboard/${organization.id}`, {
    replace: true,
  });
}, [
  userLoaded,
  orgLoaded,
  user,
  organization,
  location.pathname,
  navigate,
]);

  return null;
}