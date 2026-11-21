import { Navigate, useLocation } from "react-router-dom";

// Reset links are verified by Clerk during sign-in.
export default function ResetPasswordPage() {
  const location = useLocation();

  return <Navigate to={{ pathname: "/login", search: location.search }} replace />;
}
