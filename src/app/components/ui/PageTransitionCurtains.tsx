"use client";

import * as React from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

const CLOSE_DURATION = 0.45;
const OPEN_DURATION = 0.55;

export function PageTransitionCurtains() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const leftControls = useAnimationControls();
  const rightControls = useAnimationControls();
  const isTransitioningRef = React.useRef(false);
  const shouldOpenRef = React.useRef(false);

  React.useEffect(() => {
    if (reduceMotion) {
      leftControls.set({ width: "0%" });
      rightControls.set({ width: "0%" });
      return;
    }

    if (!shouldOpenRef.current) return;
    shouldOpenRef.current = false;

    Promise.all([
      leftControls.start({
        width: "0%",
        transition: { duration: OPEN_DURATION, ease: "easeInOut" },
      }),
      rightControls.start({
        width: "0%",
        transition: { duration: OPEN_DURATION, ease: "easeInOut" },
      }),
    ]).finally(() => {
      isTransitioningRef.current = false;
    });
  }, [pathname, reduceMotion, leftControls, rightControls]);

  React.useEffect(() => {
    if (reduceMotion) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
        return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const nextPath = `${url.pathname}${url.search}${url.hash}`;
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (nextPath === currentPath) return;
      if (isTransitioningRef.current) return;

      event.preventDefault();
      isTransitioningRef.current = true;
      shouldOpenRef.current = true;

      Promise.all([
        leftControls.start({
          width: "50%",
          transition: { duration: CLOSE_DURATION, ease: "easeInOut" },
        }),
        rightControls.start({
          width: "50%",
          transition: { duration: CLOSE_DURATION, ease: "easeInOut" },
        }),
      ]).then(() => {
        router.push(nextPath);
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, [reduceMotion, leftControls, rightControls, router]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 h-full bg-carbon"
        initial={{ width: "0%" }}
        animate={leftControls}
        style={{ willChange: "width" }}
      />
      <motion.div
        className="absolute right-0 top-0 h-full bg-carbon"
        initial={{ width: "0%" }}
        animate={rightControls}
        style={{ willChange: "width" }}
      />
    </div>
  );
}
