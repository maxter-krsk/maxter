import Link from "next/link";
export default function NavMenuHeader() {
  return (
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
  );
}