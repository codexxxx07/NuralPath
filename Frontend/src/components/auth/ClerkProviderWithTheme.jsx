import { ClerkProvider } from "@clerk/react";
import { ui } from "@clerk/ui";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { clerkAppearance, clerkAppearanceDark } from "../../lib/clerkTheme";

// Vite inlines VITE_* variables at BUILD time. On Vercel that means the value
// must exist in the build environment before `vite build` runs. To keep auth
// working even when a deployment was built without that variable, we also load
// a public runtime config (/clerk-runtime-config.js, injected in index.html).
// Publishable keys are public by design; CLERK_SECRET_KEY is never read here.
const isValidKeyShape = (value) =>
  typeof value === "string" && /^pk_(test|live)_[A-Za-z0-9+/=_-]{20,}$/.test(value.trim());

const keyCandidates = [
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  typeof window === "undefined" ? undefined : window.__NURALPATH_CLERK_PUBLISHABLE_KEY__,
];

// Prefer the build-time variable; fall back to the runtime config file.
const publishableKey = keyCandidates
  .map((candidate) => (typeof candidate === "string" ? candidate.trim() : ""))
  .find(isValidKeyShape);

const hasValidKeyShape = Boolean(publishableKey);

if (!hasValidKeyShape) {
  console.error(
    "[NuralPath] Clerk is not configured for this build. " +
      "Set VITE_CLERK_PUBLISHABLE_KEY (pk_test_... locally, pk_live_... in production) " +
      "in the build environment and rebuild/redeploy, or update the public " +
      "/clerk-runtime-config.js file. On Vercel: Project → Settings → " +
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
      Add <code className="font-mono">VITE_CLERK_PUBLISHABLE_KEY</code> and redeploy, or set it in{" "}
      <code className="font-mono">/clerk-runtime-config.js</code>.
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
