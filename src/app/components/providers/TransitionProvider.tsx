"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

type TransitionCtx = {
  startTransition: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionCtx | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error(
      "usePageTransition должен использоваться внутри <TransitionProvider>"
    );
  return ctx;
}

const DURATION = 0.7;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [covered, setCovered] = useState(false);
  const transitioningRef = useRef(false);

  const startTransition = (href: string) => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;

    setCovered(true);

    setTimeout(() => {
      router.push(href);

      setTimeout(() => {
        setCovered(false);
        setTimeout(() => {
          transitioningRef.current = false;
        }, DURATION * 1000);
      }, 100);
    }, DURATION * 1000);
  };

  return (
    <TransitionContext.Provider
      value={{ startTransition, isTransitioning: covered }}
    >
      {children}

      <div className="pointer-events-none fixed inset-0 z-[100]">
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2 origin-left bg-carbon dark:bg-paper"
          animate={{ scaleX: covered ? 1 : 0 }}
          transition={{ duration: DURATION, ease: [0.83, 0, 0.17, 1] }}
        />
        <motion.div
          className="absolute right-0 top-0 h-full w-1/2 origin-right bg-carbon dark:bg-paper"
          animate={{ scaleX: covered ? 1 : 0 }}
          transition={{ duration: DURATION, ease: [0.83, 0, 0.17, 1] }}
        />
      </div>
    </TransitionContext.Provider>
  );
}
