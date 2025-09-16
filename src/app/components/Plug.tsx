"use client";

import { usePathname } from "next/navigation";
import LogoLarge from "@/app/ui/LogoLarge";
import Link from "next/link";
import center from "@/app/styles/modules/centered.module.css";
import gradient from "@/app/styles/modules/line-gradient.module.css";
import { unbounded, roboto } from "@/app/ui/fonts";
import { motion } from "framer-motion";

export default function Plug() {
  const pathname = usePathname();

  const pagesMap: Record<string, string> = {
    "/about": "О нас",
    "/contacts": "Наши контакты",
    "/services": "Услуги",
  };

  const pageName = pagesMap[pathname] || "страница";

  return (
    <section>
      <div className="container">
        <div className={`${center.centered}`}>
          <LogoLarge />
          <p
            className={`${unbounded.className} uppercase text-[2.5rem] mt-[1.5rem]`}
          >
            Ваш digital‑партнёр в маркетинге и PR
          </p>
          <span
            className={`${gradient["line-gradient"]} h-[0.10rem] w-[70%] my-[1.5rem]`}
          ></span>
          <div className="w-full flex flex-col items-center gap-y-[1.5rem]">
            <p
              className={`${unbounded.className} text-[1.5rem] border-1 py-[0.62rem] text-center w-[70%] rounded-full font-light`}
            >
              системный подход + 20 лет опыта на рынке РФ и СНГ
            </p>
            <p className={`${roboto.className} text-[1.25rem] font-light`}>
              Страница{" "}
              <span className="font-bold text-[#423060]">«{pageName}»</span> в
              разработке.
            </p>
            <motion.a
              whileHover={{ backgroundColor: "#000", color: "#f5f5f5" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="border-1 text-[1.1rem] p-[0.62rem] w-[70%]"
              href="/"
            >
              Перейти на главную страницу
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
