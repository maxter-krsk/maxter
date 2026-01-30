import { Features } from "./Features";
import { FlipActionButton } from "@/components/animate-ui/components/buttons/flip-action";
import { Clock } from "./Clock";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center border-x border-b border-t lg:border-t-0 border-carbon dark:border-paper mb-100">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <h1 className="dark:text-paper text-carbon uppercase text-20 md:text-40 font-medium font-unbounded text-center mb-20 md:mb-50 lg:mb-140">
            Маркетинг, который работает на прибыль
          </h1>
          <Features />
          <FlipActionButton className="mb-20 sm:mb-30" type="button">
            Оставить заявку
          </FlipActionButton>
          <Clock />
        </div>
      </div>
    </section>
  );
}
