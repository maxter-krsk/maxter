"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  TypingText,
  TypingTextCursor,
} from "@/components/animate-ui/primitives/texts/typing";
import { cn } from "@/lib/utils";

type PlugProps = {
  title?: string;
  subtitle?: string;
  questionTail?: string;
  qustionTail?: string;
  className?: string;
  lockScroll?: boolean;
  typingSpeed?: number;
  holdDelay?: number;
  children?: React.ReactNode;
};

const defaultTitle = "Скоро здесь будет новое";
const defaultSubtitle = "Команда MAXTER уже работает над этой страницей.....";
const defaultQuestionTail = "Но зачем ждать?";

export default function Plug({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  questionTail,
  qustionTail,
  className,
  lockScroll = true,
  typingSpeed = 34,
  holdDelay = 750,
  children,
}: PlugProps) {
  const resolvedQuestionTail =
    questionTail ?? qustionTail ?? defaultQuestionTail;
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = React.useState<"typing" | "closing" | "done">(
    "typing",
  );

  const titleDuration = (title.length + 1) * typingSpeed;
  const subtitleDuration = (subtitle.length + 1) * typingSpeed;
  const questionDuration = (resolvedQuestionTail.length + 1) * typingSpeed;
  const subtitleDelay = titleDuration;
  const questionDelay = titleDuration + subtitleDuration;

  React.useEffect(() => {
    if (!lockScroll || typeof document === "undefined") return;
    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;

    if (phase !== "done") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
    }

    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
    };
  }, [lockScroll, phase]);

  React.useEffect(() => {
    const totalDuration = prefersReduced
      ? 0
      : titleDuration + subtitleDuration + questionDuration + holdDelay;

    setPhase("typing");
    const timer = window.setTimeout(() => {
      setPhase("closing");
    }, totalDuration);

    return () => window.clearTimeout(timer);
  }, [
    prefersReduced,
    titleDuration,
    subtitleDuration,
    questionDuration,
    holdDelay,
  ]);

  return (
    <section className={cn("relative min-h-screen w-full", className)}>
      {children ? (
        <div
          className={cn(
            "min-h-screen transition-opacity duration-500",
            phase === "done" ? "opacity-100" : "opacity-0",
          )}
        >
          {children}
        </div>
      ) : null}

      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 bg-carbon text-paper overflow-hidden"
          initial={{ y: 0 }}
          animate={{ y: phase === "closing" ? "-100%" : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (phase === "closing") setPhase("done");
          }}
        >
          <div className="container h-screen">
            <div className="h-full w-full flex items-center">
              <div className="relative flex flex-col">
                <h1 className="text-18 sm:text-30 lg:text-46 font-medium uppercase mb-40 font-unbounded">
                  <TypingText text={title} duration={typingSpeed}>
                    <TypingTextCursor style={{ height: "1em", width: "2px" }} />
                  </TypingText>
                </h1>
                <p className="text-18 sm:text-30 lg:text-46 mb-40 font-light uppercase font-unbounded">
                  <TypingText
                    text={subtitle}
                    duration={typingSpeed}
                    delay={subtitleDelay}
                  />
                </p>
                <p className="ml-auto text-18 sm:text-30 lg:text-46А font-light uppercase font-unbounded">
                  <TypingText
                    text={resolvedQuestionTail}
                    duration={typingSpeed}
                    delay={questionDelay}
                  />
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
