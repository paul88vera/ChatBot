import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { attachClerkInterceptor } from "../api/base";

export default function ClerkAxiosProvider({ children }) {
  const {
    getToken,
    isLoaded,
    isSignedIn,
  } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    console.log("=== INSTALLING CLERK AXIOS ===");

    const detach = attachClerkInterceptor(getToken);

    return detach;
  }, [getToken, isLoaded, isSignedIn]);

  return children;
}