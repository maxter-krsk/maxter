import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full resize-y border border-carbon bg-transparent p-16 text-14 text-carbon outline-none placeholder:text-ash",
        "transition-colors focus-visible:border-maxter sm:p-20 sm:text-16 lg:p-30",
        "dark:border-paper dark:text-paper dark:placeholder:text-paper/60 dark:focus-visible:border-toxic dark:[color-scheme:dark]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
