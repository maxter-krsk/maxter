import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/">
        <img className="w-[3rem] h-[3rem]" src="/icons/logos/maxter-logo.svg" alt="Логотип Макстер" />
    </Link>
  );
}