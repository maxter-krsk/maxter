import Link from "next/link";
import NavMenuFooter from "./NavMenuFooter";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <ul className="flex justify-between">
          <li className="flex flex-col">
            <span>digital</span>
            <span>upgrade</span>
          </li>
          <li>
            <NavMenuFooter />
            <Link href="mailto:maxter24@yandex.ru">maxter24@yandex.ru</Link>
            <Link href="tel:+79230198369">+7 (923) 019-83-69</Link>
          </li>
        </ul>
        <ul>
          <li>
            <p>
              Агенство коммуникаций Maxter &copy; {new Date().getFullYear()}
            </p>
          </li>
          <li>
            <Link href="/privacy-policy">Политика конфиденциальности</Link>
          </li>
        </ul>
        <h1>maxter</h1>
      </div>
    </footer>
  );
}
