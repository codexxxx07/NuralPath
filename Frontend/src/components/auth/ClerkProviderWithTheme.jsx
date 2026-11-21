import { ClerkProvider } from "@clerk/react";
import { ui } from "@clerk/ui";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { clerkAppearance, clerkAppearanceDark } from "../../lib/clerkTheme";

// Lives inside BrowserRouter + ThemeProvider so Clerk can use SPA navigation
// and follow the app's light/dark mode.
export default function ClerkProviderWithTheme({ children }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <ClerkProvider
      ui={ui}
      afterSignOutUrl="/"
      signInUrl="/login"
      signUpUrl="/register"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      appearance={theme === "dark" ? clerkAppearanceDark : clerkAppearance}
    >
      {children}
    </ClerkProvider>
  );
}
