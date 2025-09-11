import Link from "next/link";
import NavMenuFooter from "./NavMenuFooter";
import { unbounded } from "@/app/ui/fonts";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <ul className="flex justify-between mb-20">
          <li className="flex flex-col">
            <span>digital</span>
            <span>upgrade</span>
          </li>
          <li className="flex gap-x-5">
            <NavMenuFooter />
            <div className="flex flex-col">
              <Link href="tel:+79230198369">+7 (923) 019-83-69</Link>
              <Link href="mailto:maxter24@yandex.ru">maxter24@yandex.ru</Link>
            </div>
          </li>
        </ul>
        <ul className="flex justify-between">
          <li>
            <p>
              Агенство коммуникаций Maxter &copy; {new Date().getFullYear()}
            </p>
          </li>
          <li>
            <Link href="/privacy-policy">Политика конфиденциальности</Link>
          </li>
        </ul>
        <img
          src="/icons/logos/footer-logo.svg"
          alt="Логотип компании в подвале сайта"
        />
      </div>
    </footer>
  );
}
