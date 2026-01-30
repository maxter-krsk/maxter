import Image from "next/image";
import Link from "next/link";
import { Burger } from "./Burger";
import ThemeToggler from "@/lib/ui/ThemeToggler";
import { Navigation } from "./Navigation";
import { SocialLinks } from "./SocialLinks";
import { Buttons } from "./Buttons";
import styles from "@/app/styles/modules/Header/Header.module.css";

export default function Header() {
  return (
    <header className="mt-20">
      <div className="container">
        {/* Desktop */}
        <div className="hidden lg:flex items-stretch border border-carbon divide-x divide-carbon dark:border-paper dark:divide-paper h-100">
          <div className="flex items-center p-20 shrink-0">
            <Link href="/">
              <Image
                className="w-120 h-50 dark:hidden block"
                src="/icons/logos/maxter-dark.svg"
                alt="Логотип Maxter"
                width="121"
                height="50"
              />
              <Image
                className="w-120 h-50 dark:block hidden"
                src="/icons/logos/maxter-light.svg"
                alt="Логотип Maxter"
                width="121"
                height="50"
              />
            </Link>
          </div>
          <div className="flex items-center justify-center xl:px-24 flex-1">
            <Navigation />
          </div>
          <div className="flex items-stretch shrink-0">
            <SocialLinks />
          </div>
          <div className="flex items-center w-[20rem] shrink-0">
            <Buttons />
          </div>
          <div
            className={`flex items-center shrink-0 ${styles.themeTogglerWrap}`}
          >
            <ThemeToggler
              className={styles.themeTogglerButton}
              variant="ghost"
              size="sm"
              direction="ltr"
              system={false}
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden justify-between items-center">
          <Link href="/">
            <Image
              className="w-120 h-50 dark:hidden block"
              src="/icons/logos/maxter-dark.svg"
              alt="Логотип Maxter"
              width="121"
              height="50"
            />
            <Image
              className="w-120 h-50 dark:block hidden"
              src="/icons/logos/maxter-light.svg"
              alt="Логотип Maxter"
              width="121"
              height="50"
            />
          </Link>
          <div className="flex items-stretch border border-carbon dark:border-paper divide-x divide-carbon dark:divide-paper">
            <div className="flex items-center px-10">
              <ThemeToggler
                className="rounded-none [&_.theme-icon--hover]:hidden [&_.theme-icon--base]:static [&_.theme-icon--base]:[clip-path:none]"
                variant="ghost"
                size="sm"
                direction="ltr"
                system={false}
              />
            </div>

            <div className="flex items-center px-10">
              <Burger />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
