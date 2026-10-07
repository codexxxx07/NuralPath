import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <p className="select-none text-[8rem] font-semibold leading-none tracking-tight text-foreground">
          404
        </p>
        <h1 className="-mt-4 text-2xl font-semibold tracking-tight text-foreground">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link to="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
