import { Link } from "react-router-dom";
import { SignUp } from "@clerk/react";
import { StickyNote } from "../../components/skeuo/Surfaces";

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="paper animate-fade-in rounded-xl p-5 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            NuralPath · new student
          </p>

          <div className="clerk-auth mt-5">
            <SignUp signInUrl="/login" fallbackRedirectUrl="/dashboard" />
          </div>
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
              All topic libraries, quizzes, notes and cheat sheets are open. An account unlocks the
              dashboards and saved progress.
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
