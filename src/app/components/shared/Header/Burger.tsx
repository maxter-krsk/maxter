"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggler from "@/lib/ui/ThemeToggler";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/lib/ui/sheet";
import styles from "@/app/styles/modules/Header/Burger.module.css";

const links: [string, string][] = [
  ["О нас", "/about"],
  ["Услуги", "/services"],
  ["Контакты", "/contacts"],
];

const socials = [
  {
    light: "/icons/ui/socials/phone-dark.svg",
    dark: "/icons/ui/socials/phone-light.svg",
    label: "Телефон",
    href: "tel:+79999999999",
  },
  {
    light: "/icons/ui/socials/tg-dark.svg",
    dark: "/icons/ui/socials/tg-light.svg",
    label: "Telegram",
    href: "https://t.me/+79999999999",
  },
  {
    light: "/icons/ui/socials/wa-dark.svg",
    dark: "/icons/ui/socials/wa-light.svg",
    label: "WhatsApp",
    href: "https://wa.me/79999999999",
  },
];

export function Burger() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="group inline-flex h-9 w-11 flex-col justify-center gap-1.5 transition-colors hover:bg-carbon dark:border-paper dark:hover:bg-paper"
          aria-label="Открыть меню"
          aria-expanded={open}
        >
          <span className="h-[0.125rem] w-full bg-carbon transition-colors duration-200 group-hover:bg-paper dark:bg-paper dark:group-hover:bg-carbon" />
          <span className="h-[0.125rem] w-full bg-carbon transition-colors duration-200 group-hover:bg-paper dark:bg-paper dark:group-hover:bg-carbon" />
          <span className="h-[0.125rem] w-full bg-carbon transition-colors duration-200 group-hover:bg-paper dark:bg-paper dark:group-hover:bg-carbon" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={`${styles.sheet} border-carbon dark:border-paper p-0`}
      >
        <div className="container flex h-full flex-col gap-20 pt-20">
          <SheetHeader className="p-0 flex flex-row items-center justify-between">
            <SheetTitle className="font-unbounded text-20 uppercase">
              Меню
            </SheetTitle>
            <SheetClose asChild>
              <button
                className=" group grid size-14 place-items-center border border-carbon dark:border-paper bg-transparent text-carbon dark:text-paper transition-all duration-200 hover:bg-carbon hover:text-paper dark:hover:bg-paper dark:hover:text-carbon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon dark:focus-visible:ring-paper rounded-full"
                aria-label="Закрыть меню"
              ></button>
            </SheetClose>
          </SheetHeader>

          <nav className="flex flex-col gap-4">
            {links.map(([title, href]) => (
              <Link
                key={href}
                className="font-unbounded uppercase text-16 tracking-wide transition-colors hover:text-ash dark:hover:text-lavanda"
                href={href}
                onClick={() => setOpen(false)}
              >
                {title}
              </Link>
            ))}
          </nav>

          <div className="grid gap-3">
            <Link
              className="flex items-center justify-center border border-carbon px-4 py-3 font-unbounded uppercase text-14 transition-colors hover:bg-carbon hover:text-paper dark:border-paper dark:hover:bg-paper dark:hover:text-carbon"
              href="#"
            >
              Оставить заявку
            </Link>
            <Link
              className="flex items-center justify-center border border-carbon px-4 py-3 font-unbounded uppercase text-14 transition-colors hover:bg-carbon hover:text-paper dark:border-paper dark:hover:bg-paper dark:hover:text-carbon"
              href="#"
            >
              Портфолио
            </Link>
          </div>

          <div className="flex flex-col gap-10 uppercase">
            <h1 className="font-semibold font-unbounded text-20 uppercase">
              Связь:
            </h1>
            <div className="flex gap-16">
              {socials.map((social) => (
                <Link
                  key={social.href}
                  className="inline-flex items-center gap-3 transition-colors hover:text-carbon dark:hover:text-paper"
                  href={social.href}
                >
                  <span className="relative grid size-5 place-items-center">
                    <Image
                      className="absolute inset-0 transition-opacity duration-200 opacity-100 dark:opacity-0"
                      src={social.light}
                      alt={social.label}
                      width={24}
                      height={24}
                    />
                    <Image
                      className="absolute inset-0 transition-opacity duration-200 opacity-0 dark:opacity-100"
                      src={social.dark}
                      alt={social.label}
                      width={24}
                      height={24}
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
