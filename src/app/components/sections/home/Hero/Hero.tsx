import { Features } from "./Features";
import { Clock } from "./Clock";
import { DiagonalFill } from "@/lib/ui/DiagonalFill";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center border-x border-b border-t lg:border-t-0 mt-20 lg:mt-0 border-carbon dark:border-paper mb-100">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <h1 className="dark:text-paper text-carbon uppercase text-20 md:text-40 font-medium font-unbounded text-center mb-20 md:mb-50 lg:mb-140">
            Маркетинг, который работает на прибыль
          </h1>
          <Features />
          <DiagonalFill
            className="mb-20 sm:mb-30 border border-carbon px-30 py-14 font-unbounded text-14 dark:border-paper cursor-pointer"
            href="/contacts"
          >
            Оставить заявку
          </DiagonalFill>
          <Clock />
        </div>
      </div>
    </section>
  );
}
