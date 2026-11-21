import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Info } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { StickyNote } from "../../components/skeuo/Surfaces";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!name.trim()) next.name = "Enter your full name.";
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Create a password.";
    else if (password.length < 6) next.password = "Use at least 6 characters.";
    if (confirmPassword !== password) next.confirmPassword = "Passwords do not match.";
    if (!agreeTerms) next.terms = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length === 0) navigate("/dashboard");
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="paper animate-fade-in rounded-xl p-5 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            NuralPath · new student
          </p>
          <h1 className="mt-2 font-display text-3xl text-foreground">Set up your desk.</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Create an account to preview the student dashboard.
          </p>

          <div className="mt-4 flex items-start gap-2 rounded-md border border-border bg-[var(--color-paper-warm)] px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Demo registration — no backend is connected. Nothing is sent or saved; submitting a valid
              form opens the dashboard preview.
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                autoComplete="name"
                placeholder="Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(errors.name)}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? <p className="text-[11px] text-[var(--color-destructive)]">{errors.name}</p> : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? <p className="text-[11px] text-[var(--color-destructive)]">{errors.email}</p> : null}
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-9"
                    error={Boolean(errors.password)}
                    aria-invalid={Boolean(errors.password)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="icon-btn absolute right-1 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-[4px] text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password ? <p className="text-[11px] text-[var(--color-destructive)]">{errors.password}</p> : null}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-9"
                    error={Boolean(errors.confirmPassword)}
                    aria-invalid={Boolean(errors.confirmPassword)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="icon-btn absolute right-1 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-[4px] text-muted-foreground"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword ? (
                  <p className="text-[11px] text-[var(--color-destructive)]">{errors.confirmPassword}</p>
                ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border bg-background accent-[var(--color-wood)]"
                  aria-invalid={Boolean(errors.terms)}
                />
                <label htmlFor="terms" className="cursor-pointer text-[11px] leading-relaxed text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="font-medium text-primary hover:underline">Terms of Service</Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>.
                </label>
              </div>
              {errors.terms ? <p className="mt-1 text-[11px] text-[var(--color-destructive)]">{errors.terms}</p> : null}
            </div>

            <Button type="submit" className="h-11 w-full" size="lg">
              Create account <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-5 border-t border-border pt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <aside className="space-y-4 md:pt-6">
          <StickyNote tone="green" taped>
            <p className="font-hand text-xl leading-6">
              Start with one topic. Finish the first practice prompt today.
            </p>
          </StickyNote>
          <div className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
            <h2 className="text-sm font-semibold text-foreground">You do not need an account to learn</h2>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
              All topic libraries, quizzes, notes and cheat sheets are open. Accounts are for the
              dashboard demonstration.
            </p>
          </div>
          <Link to="/dsa" className="inline-block text-xs text-muted-foreground hover:text-foreground">
            Browse the DSA library →
          </Link>
        </aside>
      </div>
    </div>
  );
}
