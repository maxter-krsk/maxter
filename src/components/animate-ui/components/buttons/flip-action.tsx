"use client";

import * as React from "react";
import Link from "next/link";

import {
  FlipButton,
  FlipButtonFront,
  FlipButtonBack,
  type FlipDirection,
} from "@/components/animate-ui/primitives/buttons/flip";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  frontClassName?: string;
  backClassName?: string;
  from?: FlipDirection;
};

type LinkProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    href: string;
    type?: never;
  };

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: never;
  };

type FlipActionProps = LinkProps | ButtonProps;

const faceBase = "border border-carbon py-16 px-36 uppercase font-unbounded";
const frontFace = "!bg-transparent !text-carbon dark:!text-paper";
const backFace = "!bg-carbon !text-paper dark:!bg-paper dark:!text-carbon";

export function FlipActionButton(props: FlipActionProps) {
  const {
    children,
    className,
    frontClassName,
    backClassName,
    from = "top",
    ...rest
  } = props;

  const content = (
    <>
      <FlipButtonFront className={cn(faceBase, frontFace, frontClassName)}>
        {children}
      </FlipButtonFront>
      <FlipButtonBack className={cn(faceBase, backFace, backClassName)}>
        {children}
      </FlipButtonBack>
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...linkProps } = rest;
    return (
      <FlipButton asChild from={from} className={className}>
        <Link href={href} {...linkProps}>
          {content}
        </Link>
      </FlipButton>
    );
  }

  const { type = "button", ...buttonProps } =
    rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <FlipButton asChild from={from} className={className}>
      <button type={type} {...buttonProps}>
        {content}
      </button>
    </FlipButton>
  );
}
