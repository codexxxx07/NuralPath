import { ClerkProvider } from "@clerk/react";
import { ui } from "@clerk/ui";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { clerkAppearance, clerkAppearanceDark } from "../../lib/clerkTheme";

// Vite only exposes VITE_* variables and inlines them at BUILD time. The value
// must therefore exist in the build environment (local .env.local or Vercel →
// Settings → Environment Variables) before `vite build` runs. CLERK_SECRET_KEY
// is deliberately never read here — it must never reach the frontend bundle.
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim() || undefined;

// A Clerk publishable key always starts with pk_test_ (development) or
// pk_live_ (production). Anything else means the build was not configured.
const hasValidKeyShape = Boolean(publishableKey) && /^pk_(test|live)_[A-Za-z0-9+/=_-]{20,}$/.test(publishableKey);

if (!hasValidKeyShape) {
  console.error(
    "[NuralPath] Clerk is not configured for this build. " +
      "Set VITE_CLERK_PUBLISHABLE_KEY (pk_test_... locally, pk_live_... in production) " +
      "in the build environment and rebuild/redeploy. On Vercel: Project → Settings → " +
      "Environment Variables → add VITE_CLERK_PUBLISHABLE_KEY for Production and Preview, " +
      "then redeploy. Never put CLERK_SECRET_KEY in a frontend variable."
  );
}

function ConfigurationNotice() {
  return (
    <div
      role="alert"
      className="fixed inset-x-0 top-0 z-[100] border-b border-[var(--color-wood-dark)]/40 bg-[var(--color-paper-warm)] px-4 py-2 text-center text-xs text-foreground shadow-[var(--shadow-float)]"
    >
      Authentication is unavailable: no valid Clerk publishable key was found in this build.
      Add <code className="font-mono">VITE_CLERK_PUBLISHABLE_KEY</code> and redeploy.
    </div>
  );
}

// Lives inside BrowserRouter + ThemeProvider so Clerk can use SPA navigation
// and follow the app's light/dark mode.
export default function ClerkProviderWithTheme({ children }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <>
      {hasValidKeyShape ? null : <ConfigurationNotice />}
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
    </>
  );
}
