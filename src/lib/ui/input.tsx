import * as React from "react";
import { cn } from "@/lib/utils";
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full border border-carbon bg-transparent px-16 py-12 text-14 text-carbon outline-none placeholder:text-ash",
        "transition-colors focus-visible:border-maxter sm:px-20 sm:py-14 sm:text-16 lg:px-30",
        "dark:border-paper dark:text-paper dark:placeholder:text-paper/60 dark:focus-visible:border-toxic dark:[color-scheme:dark]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
export { Input };
