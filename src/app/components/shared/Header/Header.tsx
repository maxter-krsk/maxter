import Image from "next/image";
import Link from "next/link";
import { Burger } from "./Burger";
import ThemeToggler from "@/lib/ui/ThemeToggler";
import { Navigation } from "./Navigation";
import { SocialLinks } from "./SocialLinks";
import { Buttons } from "./Buttons";

export default function Header() {
  return (
    <header className="mt-20">
      <div className="container">
        {/* Desktop */}
        <div className="hidden lg:flex items-stretch border border-carbon divide-x divide-carbon">
          <div className="flex items-center p-20 shrink-0">
            <Link href="/">
              <Image
                className="w-120 h-50"
                src="/icons/logos/maxter-dark.svg"
                alt="Логотип Maxter"
                width="121"
                height="50"
              />
            </Link>
          </div>
          <div className="flex items-center justify-center px-24 flex-1">
            <Navigation />
          </div>
          <div className="flex items-center shrink-0">
            <SocialLinks />
          </div>
          <div className="flex items-center w-[20rem] shrink-0">
            <Buttons />
          </div>
          <div className="flex items-center px-16 shrink-0">
            <ThemeToggler
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
              className="w-120 h-50"
              src="/icons/logos/maxter-dark.svg"
              alt="Логотип Maxter"
              width="121"
              height="50"
            />
          </Link>
          <Burger />
        </div>
      </div>
    </header>
  );
}
