import { ClerkProvider } from "@clerk/react";
import { ui } from "@clerk/ui";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { clerkAppearance, clerkAppearanceDark } from "../../lib/clerkTheme";

// Vite inlines VITE_* variables when the production build runs. If the variable
// is absent from the build environment (for example on Vercel), Clerk cannot
// start and auth controls stay hidden, so make the misconfiguration visible.
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim() || undefined;

if (!publishableKey) {
  console.error(
    "[NuralPath] VITE_CLERK_PUBLISHABLE_KEY is not set for this build. Add it to " +
      "Vercel → Project → Settings → Environment Variables (Production and Preview) " +
      "using the same value as .env.local, then redeploy."
  );
}

// Lives inside BrowserRouter + ThemeProvider so Clerk can use SPA navigation
// and follow the app's light/dark mode.
export default function ClerkProviderWithTheme({ children }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
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
