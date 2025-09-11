"use client"

import { section, style } from "framer-motion/client";
import { usePathname } from "next/navigation";
import LogoLarge from "@/app/ui/LogoLarge";
import Link from "next/link";
import styles from "@/app/styles/modules/centered.module.css";

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
        <div className={styles.centered}>
          <LogoLarge />
          <p className="uppercase text-[2.5rem]">Ваш digital‑партнёр в маркетинге и PR</p>
          <span className="block text-center border-1 w-[50%] mx-auto text-[#616161]"></span>
          <p className="border-1 py-[0.62rem] text-center w-[50%] rounded-full">системный подход + 20 лет опыта на рынке РФ и СНГ</p>
          <p className="text-[1.25rem]">Страница {pageName} в разработке.</p>
          <Link className="border-1 text-[1.1rem] p-[0.62rem]" href="/">Перейти на главную страницу</Link>
        </div>
      </div>
    </section>
  );
}
