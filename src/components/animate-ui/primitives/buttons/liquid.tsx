"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import {
  Slot,
  type WithAsChild,
} from "@/components/animate-ui/primitives/animate/slot";

type LiquidButtonProps = WithAsChild<
  HTMLMotionProps<"button"> & {
    delay?: string;
    fillHeight?: string;
    hoverScale?: number;
    tapScale?: number;
  }
>;

type LiquidButtonStyle = React.CSSProperties & {
  "--liquid-button-fill-width"?: string;
  "--liquid-button-fill-height"?: string;
  "--liquid-button-delay"?: string;
};

function LiquidButton({
  delay = "0.18s",
  fillHeight = "0.125rem",
  hoverScale = 1,
  tapScale = 1,
  asChild = false,
  ...props
}: LiquidButtonProps) {
  const Component = asChild ? Slot : motion.button;

  const { style: userStyle, ...restProps } = props;

  const baseStyle: LiquidButtonStyle = {
    "--liquid-button-fill-width": "-1%",
    "--liquid-button-fill-height": fillHeight,
    "--liquid-button-delay": "0s",
    background:
      "linear-gradient(var(--liquid-button-color, #21272A) 0 0) no-repeat calc(200% - var(--liquid-button-fill-width, -1%)) 100% / 200% var(--liquid-button-fill-height, 0.2em)",
    backgroundColor: "var(--liquid-button-background-color, transparent)",
    color: "var(--liquid-button-text-color, #111827)",

    transition: `background ${delay} var(--liquid-button-delay, 0s),
                 color ${delay} ${delay},
                 background-position ${delay} calc(${delay} - var(--liquid-button-delay, 0s))`,
  };

  return (
    <Component
      whileTap={{ scale: tapScale }}
      whileHover={{
        scale: hoverScale,
        "--liquid-button-fill-width": "100%",
        "--liquid-button-fill-height": "100%",
        "--liquid-button-delay": delay,
        color: "var(--liquid-button-hover-text-color, #ffffff)",
        backgroundColor:
          "var(--liquid-button-hover-background-color, var(--liquid-button-background-color, transparent))",
        transition: {
          "--liquid-button-fill-width": { duration: 0 },
          "--liquid-button-fill-height": { duration: 0 },
          "--liquid-button-delay": { duration: 0 },
          color: { duration: 0.1 },
        },
      }}
      style={{ ...baseStyle, ...(userStyle as LiquidButtonStyle) }}
      {...restProps}
    />
  );
}

export { LiquidButton, type LiquidButtonProps };
