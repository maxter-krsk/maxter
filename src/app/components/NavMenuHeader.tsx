import Link from "next/link";
import { unbounded } from "@/app/ui/fonts";
export default function NavMenuHeader() {
  return (
    <ul className="flex gap-x-6">
      <li>
        <Link href="/about" className={`${unbounded.className} font-light`}>
          О нас
        </Link>
      </li>
      <li>
        <Link href="/services" className={`${unbounded.className} font-light`}>
          Услуги
        </Link>
      </li>
      <li>
        <Link href="/contacts" className={`${unbounded.className} font-light`}>
          Наши контакты
        </Link>
      </li>
    </ul>
  );
}