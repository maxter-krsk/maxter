"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { usePageTransition } from "@/app/components/providers/TransitionProvider";

type Props = {
  href: string;
  className?: string;
  duration?: number;
  frontClassName?: string;
  backClassName?: string;
  children: React.ReactNode;
};

export function HoverFlipNavLink({
  href,
  className,
  children,
  duration = 0.4,
  frontClassName,
  backClassName,
}: Props) {
  const { startTransition, isTransitioning } = usePageTransition();

  const hasTextSize = !!className?.match(/(^|\s)text(-\[|-[\w:]+)/);

  const containerV: Variants = {
    rest: { y: "0em", transition: { duration } },
    hover: { y: "-1em", transition: { duration } },
  };

  const title1V: Variants = {
    rest: { rotate: 0, originX: 1, originY: 0.5, transition: { duration } },
    hover: { rotate: 20, originX: 1, originY: 0.5, transition: { duration } },
  };

  const title2V: Variants = {
    rest: { rotate: 20, originX: 0, originY: 0.5, transition: { duration } },
    hover: { rotate: 0, originX: 0, originY: 0.5, transition: { duration } },
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTransitioning) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    startTransition(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center no-underline select-none cursor-pointer",
        hasTextSize ? "leading-none" : "text-20 leading-none",
        className
      )}
    >
      <motion.span
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="relative overflow-hidden p-0"
        style={{ height: "1em" }}
      >
        <motion.span variants={containerV} className="block">
          <motion.span
            variants={title1V}
            className={cn(
              "block leading-none antialiased transform-gpu [transform:translateZ(0)] text-carbon dark:text-paper",
              frontClassName
            )}
          >
            {children}
          </motion.span>

          <motion.span
            variants={title2V}
            className={cn(
              "block leading-none antialiased transform-gpu [transform:translateZ(0)] text-carbon dark:text-toxic",
              backClassName
            )}
          >
            {children}
          </motion.span>
        </motion.span>
      </motion.span>
    </Link>
  );
}
