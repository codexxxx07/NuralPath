import { Navigate } from "react-router-dom";

// Clerk handles password resets inside the sign-in flow ("Forgot password?").
export default function ForgotPasswordPage() {
  return <Navigate to="/login" replace />;
}
