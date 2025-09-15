import Link from "next/link";
import NavMenuFooter from "./NavMenuFooter";
import { unbounded } from "@/app/ui/fonts";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <ul className="flex justify-between items-center mb-20">
          <li className="flex flex-col">
            <span className={`${unbounded.className} uppercase font-bold`}>
              digital
            </span>
            <span className={`${unbounded.className} uppercase font-bold`}>
              upgrade
            </span>
          </li>
          <li className="flex justify-between gap-x-20">
            <NavMenuFooter />
            <div className="flex flex-col">
              <p className={`${unbounded.className} uppercase`}>
                связаться с нами:
              </p>
              <Link
                className={`${unbounded.className} uppercase`}
                href="tel:+79230198369"
              >
                +7 (923) 019-83-69
              </Link>
              <Link
                className={`${unbounded.className} uppercase`}
                href="mailto:maxter24@yandex.ru"
              >
                maxter24@yandex.ru
              </Link>
            </div>
          </li>
        </ul>
        <ul className="flex justify-between mb-[2.5rem]">
          <li>
            <p>
              Агентство коммуникаций Maxter &copy; {new Date().getFullYear()}
            </p>
          </li>
          <li>
            <Link href="/privacy-policy">Политика конфиденциальности</Link>
          </li>
        </ul>
        <Link href="/">
          <img
            src="/icons/logos/footer-logo.svg"
            alt="Логотип компании в подвале сайта"
          />
        </Link>
      </div>
    </footer>
  );
}
