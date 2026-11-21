import { Link } from "react-router-dom";
import { SignIn } from "@clerk/react";
import { StickyNote } from "../../components/skeuo/Surfaces";

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="paper animate-fade-in rounded-xl p-5 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            NuralPath · student sign in
          </p>

          <div className="clerk-auth mt-5">
            <SignIn signUpUrl="/register" fallbackRedirectUrl="/dashboard" />
          </div>
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
              Your account opens the student, mentor and admin dashboards. The learning libraries
              stay open to everyone.
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
