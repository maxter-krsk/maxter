import Logo from "@/app/ui/Logo";
import Link from "next/link";
import NavMenuHeader from "./NavMenuHeader";
import { unbounded } from "@/app/ui/fonts";
import { Grid } from "@mui/material";
import line from "@/app/styles/modules/link-underline.module.css";
export default function Header() {
  return (
    <header className="py-3">
      <div className="container">
        <ul className="flex justify-between items-center">
          <li className="w-[30rem]">
            <Logo />
          </li>
          <li>
            <nav>
              <NavMenuHeader />
            </nav>
          </li>
          <li className="flex gap-5 items-center w-[30rem] justify-end">
            <Link href="mailto:maxter24@yandex.ru">
              <img
                className=""
                src="/icons/ui/email-icon.svg"
                alt="email иконка"
              />
            </Link>
            <Link href="tel:+79230198369">
              <img
                className="border-r-2 pr-5"
                src="/icons/ui/call-icon.svg"
                alt="Трубка телефона"
              />
            </Link>
            <Link href="/" className={`${unbounded.className} ${line["line-link"]}`}
            data-replace="Оставить заявку"
            >
              <span>Оставить заявку</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
