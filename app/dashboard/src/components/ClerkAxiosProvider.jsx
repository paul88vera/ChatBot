import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { attachClerkInterceptor } from "../api/base";

export default function ClerkAxiosProvider({ children }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setReady(false);
      return;
    }

    const detach = attachClerkInterceptor(getToken);

    setReady(true);

    return () => {
      detach();
      setReady(false);
    };
  }, [getToken, isLoaded, isSignedIn]);

  if (!ready) {
    return <div>Loading authenticated dashboard...</div>;
  }

  return children;
}