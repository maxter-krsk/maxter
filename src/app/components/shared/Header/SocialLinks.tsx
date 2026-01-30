import Image from "next/image";
import Link from "next/link";
import styles from "@/app/styles/modules/Header/SocialLinks.module.css";

export function SocialLinks() {
  const socialLinks = [
    {
      light: "/icons/ui/socials/phone-dark.svg",
      dark: "/icons/ui/socials/phone-light.svg",
      alt: "РўРµР»РµС„РѕРЅ",
      href: "https://wa.me/79999999999",
    },
    {
      light: "/icons/ui/socials/tg-dark.svg",
      dark: "/icons/ui/socials/tg-light.svg",
      alt: "Telegram",
      href: "https://t.me/+79999999999",
    },
    {
      light: "/icons/ui/socials/wa-dark.svg",
      dark: "/icons/ui/socials/wa-light.svg",
      alt: "WhatsApp",
      href: "tel:+79999999999",
    },
  ];

  return (
    <ul className={`${styles.socialGrid} grid h-full grid-rows-[1fr_1fr]`}>
      {/* Р›РµРІР°СЏ Р±РѕР»СЊС€Р°СЏ */}
      <li className="relative row-span-2 flex h-full items-center justify-center border-r border-carbon dark:border-paper">
        <Link className={styles.socialLink} href={socialLinks[0].href}>
          <span className={`${styles.iconWrap} ${styles.iconWrapBase}`}>
            <Image
              className={`w-24 h-24 ${styles.iconImg}`}
              src={socialLinks[0].light}
              alt={socialLinks[0].alt}
              width={24}
              height={24}
            />
          </span>
          <span className={`${styles.iconWrap} ${styles.iconWrapHover}`}>
            <Image
              className={`w-24 h-24 ${styles.iconImg}`}
              src={socialLinks[0].dark}
              alt={socialLinks[0].alt}
              width={24}
              height={24}
            />
          </span>
        </Link>
      </li>

      {/* РџСЂР°РІР°СЏ РІРµСЂС…РЅСЏСЏ */}
      <li className="relative flex h-full items-center justify-center border-b border-carbon dark:border-paper">
        <Link className={styles.socialLink} href={socialLinks[1].href}>
          <span className={`${styles.iconWrap} ${styles.iconWrapBase}`}>
            <Image
              className={`w-24 h-24 ${styles.iconImg}`}
              src={socialLinks[1].light}
              alt={socialLinks[1].alt}
              width={24}
              height={24}
            />
          </span>
          <span className={`${styles.iconWrap} ${styles.iconWrapHover}`}>
            <Image
              className={`w-24 h-24 ${styles.iconImg}`}
              src={socialLinks[1].dark}
              alt={socialLinks[1].alt}
              width={24}
              height={24}
            />
          </span>
        </Link>
      </li>

      {/* РџСЂР°РІР°СЏ РЅРёР¶РЅСЏСЏ */}
      <li className="relative flex h-full items-center justify-center">
        <Link className={styles.socialLink} href={socialLinks[2].href}>
          <span className={`${styles.iconWrap} ${styles.iconWrapBase}`}>
            <Image
              className={`w-24 h-24 ${styles.iconImg}`}
              src={socialLinks[2].light}
              alt={socialLinks[2].alt}
              width={24}
              height={24}
            />
          </span>
          <span className={`${styles.iconWrap} ${styles.iconWrapHover}`}>
            <Image
              className={`w-24 h-24 ${styles.iconImg}`}
              src={socialLinks[2].dark}
              alt={socialLinks[2].alt}
              width={24}
              height={24}
            />
          </span>
        </Link>
      </li>
    </ul>
  );
}
