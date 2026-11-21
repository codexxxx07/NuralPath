import { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, RotateCcw, TriangleAlert } from "lucide-react";

class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error("NuralPath page error:", error, info);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="paper w-full max-w-lg rounded-xl p-6 text-center shadow-[var(--shadow-card)] sm:p-8">
          <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-destructive)_12%,transparent)]">
            <TriangleAlert className="h-5 w-5 text-[var(--color-destructive)]" />
          </span>
          <h1 className="mt-4 font-display text-2xl text-foreground">This page could not open.</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Something went wrong while rendering this page. Nothing was lost — your notes, bookmarks and
            local records are stored in this browser.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
            >
              <RotateCcw className="h-4 w-4" /> Reload page
            </button>
            <Link
              to="/"
              className="btn-paper btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

/** Resets the boundary whenever the route changes. */
export default function ErrorBoundary({ children }) {
  const { pathname } = useLocation();
  return <Boundary key={pathname}>{children}</Boundary>;
}
