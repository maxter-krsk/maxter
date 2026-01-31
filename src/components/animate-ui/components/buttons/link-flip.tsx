"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type FlipDirection = "top" | "bottom" | "left" | "right";

type Props = {
  href: string;
  className?: string;
  duration?: number;
  frontClassName?: string;
  backClassName?: string;
  from?: FlipDirection;
  children: React.ReactNode;
};

const buildVariant = ({
  opacity,
  rotation,
  offset,
  isVertical,
  rotateAxis,
}: {
  opacity: number;
  rotation: number;
  offset: string | null;
  isVertical: boolean;
  rotateAxis: string;
}) => ({
  opacity,
  [rotateAxis]: rotation,
  ...(isVertical && offset !== null ? { y: offset } : {}),
  ...(!isVertical && offset !== null ? { x: offset } : {}),
});

export function HoverFlipNavLink({
  href,
  className,
  duration = 0.35,
  frontClassName,
  backClassName,
  from = "top",
  children,
}: Props) {
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";
  const frontOffset = from === "top" || from === "left" ? "50%" : "-50%";
  const backOffset = from === "top" || from === "left" ? "-50%" : "50%";
  const frontRotation = from === "top" || from === "left" ? 90 : -90;
  const backRotation = -frontRotation;

  const frontVariants: Variants = {
    initial: buildVariant({
      opacity: 1,
      rotation: 0,
      offset: "0%",
      isVertical,
      rotateAxis,
    }),
    hover: buildVariant({
      opacity: 0,
      rotation: frontRotation,
      offset: frontOffset,
      isVertical,
      rotateAxis,
    }),
  };

  const backVariants: Variants = {
    initial: buildVariant({
      opacity: 0,
      rotation: backRotation,
      offset: backOffset,
      isVertical,
      rotateAxis,
    }),
    hover: buildVariant({
      opacity: 1,
      rotation: 0,
      offset: "0%",
      isVertical,
      rotateAxis,
    }),
  };

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center no-underline select-none cursor-pointer",
        className,
      )}
    >
      <motion.span
        className="relative inline-grid place-items-center"
        style={{ perspective: "900px" }}
        initial="initial"
        whileHover="hover"
      >
        <motion.span
          className={cn(
            "inline-flex items-center justify-center text-current",
            frontClassName,
          )}
          style={{
            gridArea: "1 / 1",
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
          transition={{ duration, ease: "easeOut" }}
          variants={frontVariants}
        >
          {children}
        </motion.span>
        <motion.span
          className={cn(
            "inline-flex items-center justify-center text-current dark:text-toxic",
            backClassName,
          )}
          style={{
            gridArea: "1 / 1",
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
          transition={{ duration, ease: "easeOut" }}
          variants={backVariants}
        >
          {children}
        </motion.span>
      </motion.span>
    </Link>
  );
}
