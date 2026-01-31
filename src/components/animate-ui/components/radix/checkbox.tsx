import * as React from "react";

import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator as CheckboxIndicatorPrimitive,
  type CheckboxProps as CheckboxPrimitiveProps,
} from "@/components/animate-ui/primitives/radix/checkbox";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useCheckbox } from "@/components/animate-ui/primitives/radix/checkbox";

const checkboxVariants = cva(
  "peer shrink-0 flex items-center justify-center outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-500 focus-visible:ring-offset-2 [&[data-state=checked],&[data-state=indeterminate]]:bg-primary [&[data-state=checked],&[data-state=indeterminate]]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "bg-background border",
        accent: "bg-input",
      },
      size: {
        default: "size-5 rounded-sm",
        sm: "size-4.5 rounded-[5px]",
        lg: "size-6 rounded-[7px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const checkboxIndicatorVariants = cva("", {
  variants: {
    size: {
      default: "size-3.5",
      sm: "size-3",
      lg: "size-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type CheckboxProps = CheckboxPrimitiveProps &
  VariantProps<typeof checkboxVariants> & {
    indicator?: "check" | "dot";
  };

function DotIndicator({ size }: { size?: "default" | "sm" | "lg" }) {
  const { isChecked } = useCheckbox();
  if (!isChecked) return null;

  const sizeClass =
    size === "sm" ? "size-2.5" : size === "lg" ? "size-3.5" : "size-3";

  return (
    <span
      className={cn(
        "rounded-full bg-carbon dark:bg-paper",
        sizeClass,
      )}
    />
  );
}

function Checkbox({
  className,
  children,
  variant,
  size,
  indicator = "check",
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive
      className={cn(checkboxVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {indicator === "check" ? (
        <CheckboxIndicatorPrimitive
          className={cn(checkboxIndicatorVariants({ size }))}
        />
      ) : (
        <DotIndicator size={size} />
      )}
    </CheckboxPrimitive>
  );
}

export { Checkbox, type CheckboxProps };
