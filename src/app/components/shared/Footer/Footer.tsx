"use client";

import { Logo } from "@/app/components/ui/Logo";
import { HoverFlipNavLink } from "@/components/animate-ui/components/buttons/link-flip";
import { unbounded, roboto } from "@/app/components/ui/fonts";

const nav = {
  items: [
    {
      title: "О нас",
      link: "/about",
    },
    {
      title: "Услуги",
      link: "/services",
    },
    {
      title: "Наши контакты",
      link: "/contacts",
    },
  ],
};

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={`${unbounded.className} dark:text-paper`}>
      <div className="container">
        <div className="flex flex-col gap-40 xs:flex-row xs:justify-between items-start mb-50">
          <span className="uppercase font-bold">
            digital
            <br />
            upgrade
          </span>
          <nav className="uppercase flex-col md:flex-row flex gap-40">
            <ul className="flex flex-col gap-14 xs:gap-20 desk:flex-row desk:gap-40 uppercase font-bold text-16">
              {nav.items.map((item) => (
                <li className="desk:mb-20" key={item.title}>
                  <HoverFlipNavLink className="text-16" href={item.link}>
                    {item.title}
                  </HoverFlipNavLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-10">
              <span className="font-bold">Связаться с нами:</span>
              <HoverFlipNavLink className="text-16" href="tel:+79230198369">
                +7 (923) 019-83-69
              </HoverFlipNavLink>
              <HoverFlipNavLink className="text-16" href="mailto:maxter24@yandex.ru">
                maxter24@yandex.ru
              </HoverFlipNavLink>
            </div>
          </nav>
        </div>
        <div
          className={`${roboto.className} flex flex-col gap-10 xs:gap-0 xs:flex-row justify-between text-14 font-light mb-50 xs:mb-100 xs:items-center`}
        >
          <span>© Агентство коммуникаций Maxter, {year}</span>
          <HoverFlipNavLink className="text-14" href="/privacy-policy">
            Политика конфиденциальности
          </HoverFlipNavLink>
        </div>
        <Logo />
      </div>
    </footer>
  );
}
