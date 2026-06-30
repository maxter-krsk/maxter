import Image from "next/image";
import Link from "next/link";
import styles from "@/app/styles/modules/Header/SocialLinks.module.css";
import { contactInfo } from "@/lib/site";

export function SocialLinks() {
  const socialLinks = [
    {
      light: "/icons/ui/socials/phone-dark.svg",
      dark: "/icons/ui/socials/phone-light.svg",
      alt: "Телефон",
      href: contactInfo.phoneHref,
    },
  ];

  return (
    <ul className={`${styles.socialGrid} grid h-full grid-cols-1`}>
      <li className="relative flex h-full items-center justify-center">
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
    </ul>
  );
}
