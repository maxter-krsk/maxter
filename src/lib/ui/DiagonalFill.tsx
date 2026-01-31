import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "@/app/styles/modules/shared/DiagonalFill.module.css";

type DiagonalFillProps = {
  className?: string;
  href?: string;
  as?: "button" | "a" | "span";
  hoverContent?: React.ReactNode;
  sizerContent?: React.ReactNode;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children">;

export function DiagonalFill({
  className,
  href,
  as = "button",
  children,
  hoverContent,
  sizerContent,
  ...props
}: DiagonalFillProps) {
  const hover = hoverContent ?? children;
  const sizer = sizerContent ?? children;
  const content = (
    <>
      <span className={styles.labelSizer} aria-hidden="true">
        {sizer}
      </span>
      <span className={styles.labelBase}>{children}</span>
      <span className={styles.labelHover} aria-hidden="true">
        {hover}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(styles.diagonalFill, className)}>
        {content}
      </Link>
    );
  }

  if (as === "a") {
    return (
      <a className={cn(styles.diagonalFill, className)} {...props}>
        {content}
      </a>
    );
  }

  if (as === "span") {
    return (
      <span className={cn(styles.diagonalFill, className)} {...props}>
        {content}
      </span>
    );
  }

  return (
    <button className={cn(styles.diagonalFill, className)} {...props}>
      {content}
    </button>
  );
}
