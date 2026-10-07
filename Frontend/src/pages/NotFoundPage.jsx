import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center"
      >
        <p className="select-none text-[8rem] font-semibold leading-none tracking-tight text-foreground">
          404
        </p>
        <h1 className="-mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
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
      </motion.div>
    </div>
  );
}
