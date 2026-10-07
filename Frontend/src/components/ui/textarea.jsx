import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "field flex min-h-[96px] w-full resize-y px-3 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-destructive",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
