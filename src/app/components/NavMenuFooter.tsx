import Link from "next/link";
import { unbounded } from "@/app/ui/fonts";
export default function NavMenuFooter() {
  return (
    <ul className="flex gap-5">
      <li>
        <Link href="/about" className={`${unbounded.className} uppercase font-bold`}>
          О нас
        </Link>
      </li>
      <li>
        <Link href="/services" className={`${unbounded.className} uppercase font-bold`}>
          Услуги
        </Link>
      </li>
      <li>
        <Link href="/contacts" className={`${unbounded.className} uppercase font-bold`}>
          Наши контакты
        </Link>
      </li>
    </ul>
  );
}
