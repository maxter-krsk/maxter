import { HoverFlipNavLink } from "@/components/animate-ui/components/buttons/link-flip";
import { headerLinks } from "./links";

export function Navigation() {
  return (
    <nav>
      <ul className="flex gap-40 text-14 xl:text-16">
        {headerLinks.map(([title, href]) => (
          <li key={href}>
            <HoverFlipNavLink
              className="font-unbounded uppercase dark:text-paper"
              href={href}
            >
              {title}
            </HoverFlipNavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
