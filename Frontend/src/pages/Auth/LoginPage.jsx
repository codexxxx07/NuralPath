import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Info } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { StickyNote } from "../../components/skeuo/Surfaces";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length === 0) navigate("/dashboard");
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="paper animate-fade-in rounded-xl p-5 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            NuralPath · student sign in
          </p>
          <h1 className="mt-2 font-display text-3xl text-foreground">Welcome back.</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to continue learning at your desk.
          </p>

          <div className="mt-4 flex items-start gap-2 rounded-md border border-border bg-[var(--color-paper-warm)] px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Demo authentication — no backend is connected. Submitting valid credentials opens the
              student dashboard preview; nothing is verified or stored.
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                error={Boolean(errors.email)}
              />
              {errors.email ? (
                <p id="email-error" className="text-[11px] text-[var(--color-destructive)]">{errors.email}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  error={Boolean(errors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="icon-btn absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-[4px] text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password ? (
                <p id="password-error" className="text-[11px] text-[var(--color-destructive)]">{errors.password}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-background accent-[var(--color-wood)]"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="h-11 w-full" size="lg">
              Sign in <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-5 border-t border-border pt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <aside className="space-y-4 md:pt-6">
          <StickyNote tone="yellow" taped>
            <p className="font-hand text-xl leading-6">
              Pick up where you left off — the notebook remembers.
            </p>
          </StickyNote>
          <div className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
            <h2 className="text-sm font-semibold text-foreground">What is protected</h2>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
              Dashboards contain sample data in this build. No private user data exists to expose, and
              no credentials are stored.
            </p>
          </div>
          <Link to="/" className="inline-block text-xs text-muted-foreground hover:text-foreground">
            ← Back to the desk
          </Link>
        </aside>
      </div>
    </div>
  );
}
