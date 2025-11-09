"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  TypingText,
  TypingTextCursor,
} from "@/components/animate-ui/primitives/texts/typing";
import { MainForm } from "@/app/components/ui/Forms/MainForm";
import { Separator } from "@/lib/ui/separator";

interface TypingTextDemoProps {
  delay?: number;
  holdDelay?: number;
  loop?: boolean;
  cursor?: boolean;
}

export default function Plug({ cursor = true }: TypingTextDemoProps) {
  const [phase, setPhase] = useState<"typing" | "closing" | "done">("typing");
  const [step, setStep] = useState(0);
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative min-h-screen">
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 bg-carbon text-white overflow-hidden container"
          initial={{ y: 0 }}
          animate={{ y: phase === "closing" ? "-100%" : 0 }}
          onAnimationComplete={() => {
            if (phase === "closing") setPhase("done");
          }}
        >
          <div className="mx-auto max-w-screen h-full px-6 md:px-10 flex items-center">
            <div className="flex flex-col gap-40">
              <div className="space-y-8">
                {step >= 0 && (
                  <TypingText
                    text="СКОРО ЗДЕСЬ БУДЕТ НОВОЕ"
                    duration={60}
                    inView
                    onFinish={() => setStep(1)}
                    className="block text-46 font-unbounded font-medium"
                  >
                    {cursor && (
                      <TypingTextCursor className="!h-44 !w-1 rounded-full ml-1" />
                    )}
                  </TypingText>
                )}
              </div>

              {step >= 1 && (
                <TypingText
                  text="КОМАНДА MAXTER УЖЕ РАБОТАЕТ НАД ЭТОЙ СТРАНИЦЕЙ....."
                  duration={60}
                  inView
                  onFinish={() => setStep(2)}
                  className="block text-46 font-unbounded font-light w-full"
                >
                  {cursor && (
                    <TypingTextCursor className="!h-44 !w-1 rounded-full ml-1" />
                  )}
                </TypingText>
              )}

              <div className="flex items-center md:items-end justify-end text-right">
                {step >= 2 && (
                  <TypingText
                    text="НО ЗАЧЕМ ЖДАТЬ?"
                    duration={70}
                    inView
                    onFinish={() => setTimeout(() => setPhase("closing"), 800)}
                    className="block text-46 font-unbounded font-light"
                  >
                    {cursor && (
                      <TypingTextCursor className="!h-44 !w-1 rounded-full ml-1" />
                    )}
                  </TypingText>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Основной контент — появится после закрытия занавеса */}
      <motion.div
        className="container mx-auto py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "done" ? 1 : 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.5 }}
      >
        <h1 className="uppercase font-unbounded font-medium text-46 text-carbon dark:text-paper mb-20">
          Заполните анкету, чтобы обсудить проект
        </h1>
        <p className="mb-40">
          Мы принимаем на себя обязательство о том, что коммерческая информация,
          полученная в рамках подготовки и реализации проекта, является
          конфиденциальной и не подлежит разглашению или передаче третьим лицам.
        </p>
        <Separator className="w-full h-1 bg-carbon dark:bg-paper mb-40" />
        <MainForm />
      </motion.div>
    </section>
  );
}
