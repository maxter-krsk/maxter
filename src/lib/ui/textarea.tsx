import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border border-carbon dark:border-paper p-30 text-carbon dark:text-paper text-16",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
