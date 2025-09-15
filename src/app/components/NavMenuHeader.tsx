import Link from "next/link";
import { unbounded } from "@/app/ui/fonts";
export default function NavMenuHeader() {
  return (
    <ul className="flex gap-x-4">
      <li>
        <Link href="/about" className="uppercase">
          О нас
        </Link>
      </li>
      <li>
        <Link href="/services" className="uppercase">
          Услуги
        </Link>
      </li>
      <li>
        <Link href="/contacts" className="uppercase">
          Наши контакты
        </Link>
      </li>
    </ul>
  );
}