import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/react";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-wood)] border-t-transparent" />
        <span className="sr-only">Checking your session…</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
