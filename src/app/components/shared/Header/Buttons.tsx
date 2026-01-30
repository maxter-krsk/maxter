import Image from "next/image";
import { DiagonalFill } from "@/lib/ui/DiagonalFill";

export function Buttons() {
  return (
    <div className="flex h-full flex-col divide-y divide-carbon dark:divide-paper w-full">
      <div className="flex flex-1">
        <DiagonalFill href="#" className="h-full w-full">
          Оставить заявку
        </DiagonalFill>
      </div>
      <div className="flex flex-1">
        <DiagonalFill
          className="h-full w-full"
          hoverContent={
            <>
              <Image
                className="w-[70%] h-auto block dark:hidden"
                src="/icons/ui/arrow-light.svg"
                alt="Перейти"
                width="102"
                height="1"
              />
              <Image
                className="w-[70%] h-auto hidden dark:block"
                src="/icons/ui/arrow-dark.svg"
                alt="Перейти"
                width="102"
                height="1"
              />
            </>
          }
          href="#"
        >
          Портфолио
        </DiagonalFill>
      </div>
    </div>
  );
}
