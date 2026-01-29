import Image from "next/image";
import Link from "next/link";

export function SocialLinks() {
  const socialLinks = [
    {
      src: "/icons/ui/socials/phone-dark.svg",
      alt: "Телефон",
      href: "https://wa.me/79999999999",
    },
    {
      src: "/icons/ui/socials/tg-dark.svg",
      alt: "Telegram",
      href: "https://t.me/+79999999999",
    },
    {
      src: "/icons/ui/socials/wa-dark.svg",
      alt: "WhatsApp",
      href: "tel:+79999999999",
    },
  ];

  return (
    <ul className="grid h-full grid-cols-2 grid-rows-2">
      <li className="row-span-2 flex h-full items-center justify-center px-12 border-r border-carbon">
        <Link
          className="flex h-full w-full items-center justify-center"
          href={socialLinks[0].href}
        >
          <Image
            className="w-24 h-24"
            src={socialLinks[0].src}
            alt={socialLinks[0].alt}
            width={24}
            height={24}
          />
        </Link>
      </li>

      {/* Правая верхняя */}
      <li className="flex h-full items-center justify-center border-b border-carbon">
        <Link
          className="flex h-full w-full items-center justify-center"
          href={socialLinks[1].href}
        >
          <Image
            className="w-24 h-24"
            src={socialLinks[1].src}
            alt={socialLinks[1].alt}
            width={24}
            height={24}
          />
        </Link>
      </li>

      {/* Правая нижняя */}
      <li className="flex h-full items-center justify-center">
        <Link
          className="flex h-full w-full items-center justify-center"
          href={socialLinks[2].href}
        >
          <Image
            className="w-24 h-24"
            src={socialLinks[2].src}
            alt={socialLinks[2].alt}
            width={24}
            height={24}
          />
        </Link>
      </li>
    </ul>
  );
}
