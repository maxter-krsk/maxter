import Link from "next/link";
import { HoverFlipNavLink } from "@/components/animate-ui/components/buttons/link-flip";

export function Navigation() {
  const links: [string, string][] = [
    ["О нас", "/about"],
    ["Услуги", "/services"],
    ["Контакты", "/contacts"],
  ];

  return (
    <nav>
      <ul className="flex gap-40">
        {links.map(([title, href]) => (
          <li key={href}>
            <HoverFlipNavLink className="font-unbounded uppercase" href={href}>
              {title}
            </HoverFlipNavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
