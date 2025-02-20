import { useState, useEffect } from "react";
import { authStateListener } from "../utils/auth";
import { useRouter } from "next/router";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    authStateListener((authUser) => {
      if (!authUser) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setUser(authUser);
      }
    });
  }, [router]);

  if (!user) return <p>Loading...</p>; // Prevent rendering protected content until user is known

  return children;
}
