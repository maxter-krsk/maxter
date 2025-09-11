import Logo from "@/app/ui/Logo";
import Link from "next/link";
import NavMenu from "./NavMenu";
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
            <NavMenu />
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
