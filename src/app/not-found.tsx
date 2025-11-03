import Image from "next/image";
import ThemeToggler from "@/lib/ui/ThemeToggler";
import { unbounded } from "@/app/components/ui/fonts";
import {
  FlipButton,
  FlipButtonFront,
  FlipButtonBack,
} from "@/components/animate-ui/primitives/buttons/flip";

export default function NotFound() {
  return (
    <section className="h-screen flex flex-col justify-center">
      <div className="container">
        <ThemeToggler
          variant="default"
          size="default"
          direction="ltr"
          system={false}
        />
        <div className="flex flex-col justify-center items-center uppercase gap-20 md:gap-50">
          <Image
            className="w-full h-auto"
            src="/icons/ui/404/404.svg"
            alt="404 страница не найдена"
            width={1260}
            height={390}
          ></Image>
          <div className="text-carbon dark:text-paper text-center flex flex-col gap-20">
            <h1>страницан не найдена</h1>
            <p className={`${unbounded.className} text-16}`}>
              Но маркетинг, который работает на прибыль, вы точно нашли
            </p>
            <FlipButton
              className={`${unbounded.className} text-16 cursor-pointer`}
            >
              <FlipButtonFront className="py-16 px-30">
                Вернуться на главную
              </FlipButtonFront>
              <FlipButtonBack className="py-16 px-30">
                Вернуться на главную
              </FlipButtonBack>
            </FlipButton>
          </div>
        </div>
      </div>
    </section>
  );
}
