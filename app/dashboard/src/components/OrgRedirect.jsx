import { useEffect } from "react";
import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { useOrganization } from "@clerk/clerk-react";

export function OrgRedirect() {
  const { organization } = useOrganization();
  const location = useLocation();
  const navigate = useNavigate();
  const matches = useMatches();

  useEffect(() => {
    // ⛔ Skip redirecting entirely for localhost:5400 (backend routes)
    // if (window.location.port === "5400") return; 

    if (!organization) return;

    const orgId = organization.id;
    const parts = location.pathname.split("/").filter(Boolean);

    // If the URL already has the correct orgId, do nothing
    if (parts[0] === orgId) return;

    // Build new path
    const newPath = `/${orgId}/${parts.slice(1).join("/")}`;

    // Does the newPath match a valid route?
    const newPathExists = matches.some((m) => m.pathname === newPath);

    if (newPathExists) {
      navigate(newPath, { replace: true });
    } else {
      navigate(`/${orgId}/dashboard`, { replace: true });
    }
  }, [organization, location.pathname, navigate, matches]);

  return null;
}
