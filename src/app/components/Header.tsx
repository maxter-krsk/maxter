import Logo from "@/app/ui/Logo";
import Link from "next/link";
export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-x-5">
            <Logo />
            <span className="uppercase">maxter</span>
          </div>
          <nav>
            <ul className="flex gap-x-4">
              <li>
                <Link href="/about" className="text-blue-500 underline">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-500 underline">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-blue-500 underline">
                  Наши контакты
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-y-2 items-center">
            <Link href="mailto:maxter24@yandex.ru">maxter24@yandex.ru</Link>
            <Link href="tel:+79230198369">+7 (923) 019-83-69</Link>
          </div>
          <Link href="/" className="uppercase text-center">
            Оставить
            <br />
            заявку
          </Link>
        </div>
      </div>
    </header>
  );
}
