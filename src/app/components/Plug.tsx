"use client";

import { section, style } from "framer-motion/client";
import { usePathname } from "next/navigation";
import LogoLarge from "@/app/ui/LogoLarge";
import Link from "next/link";
import center from "@/app/styles/modules/centered.module.css";
import gradient from "@/app/styles/modules/line-gradient.module.css";
import { unbounded } from "@/app/ui/fonts";

export default function Plug() {
  const pathname = usePathname();

  const pagesMap: Record<string, string> = {
    "/about": "о нас",
    "/contacts": "контакты",
    "/services": "услуги",
  };

  const pageName = pagesMap[pathname] || "страница";

  return (
    <section>
      <div className="container">
        <div className={center.centered}>
          <LogoLarge />
          <p
            className={`${unbounded.className} uppercase text-[2.5rem] mt-[1.5rem]`}
          >
            Ваш digital‑партнёр в маркетинге и PR
          </p>
          <span
            className={`${gradient["line-gradient"]} h-[0.10rem] w-[50%] my-[1.5rem]`}
          ></span>
          <div className="w-full flex flex-col items-center gap-y-[1.5rem]">
            <p className="border-1 py-[0.62rem] text-center w-[50%] rounded-full">
              системный подход + 20 лет опыта на рынке РФ и СНГ
            </p>
            <p className="text-[1.25rem]">Страница {pageName} в разработке.</p>
            <Link className="border-1 text-[1.1rem] p-[0.62rem]" href="/">
              Перейти на главную страницу
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
