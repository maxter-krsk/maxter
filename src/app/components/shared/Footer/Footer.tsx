"use client";

import ThemeToggler from "@/lib/ui/ThemeToggler";
import { Logo } from "@/app/components/ui/Logo";
import { HoverFlipNavLink } from "@/components/animate-ui/components/buttons/link-flip";

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
    <footer className="dark:text-paper">
      <div className="container">
        <div className="flex justify-between items-start mb-50">
          <span className="uppercase font-bold">
            digital
            <br />
            upgrade
          </span>
          <ThemeToggler
            system={false}
            size="sm"
            variant="default"
            direction="ltr"
          />
          <nav className="uppercase flex gap-40">
            <ul className="flex gap-40 uppercase font-bold text-16">
              {nav.items.map((item) => (
                <li className="mb-20" key={item.title}>
                  <HoverFlipNavLink className="text-16" href={item.link}>
                    {item.title}
                  </HoverFlipNavLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-10">
              <span className="font-bold">Связаться с нами:</span>
              <HoverFlipNavLink href="tel:+79230198369">
                +7 (923) 019-83-69
              </HoverFlipNavLink>
              <HoverFlipNavLink href="mailto:maxter24@yandex.ru">
                maxter24@yandex.ru
              </HoverFlipNavLink>
            </div>
          </nav>
        </div>
        <div className="flex justify-between text-14 font-light mb-100 items-center">
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
