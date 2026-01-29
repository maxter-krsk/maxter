import { HoverFlipNavLink } from "@/components/animate-ui/components/buttons/link-flip";

export function Buttons() {
  return (
    <div className="flex h-full flex-col divide-y divide-carbon w-full">
      <div className="flex flex-1">
        <HoverFlipNavLink
          className="flex items-center justify-center h-full w-full"
          href="#"
        >
          Оставить заявку
        </HoverFlipNavLink>
      </div>
      <div className="flex flex-1">
        <HoverFlipNavLink
          className="flex items-center justify-center h-full w-full"
          href="#"
        >
          Портфолио
        </HoverFlipNavLink>
      </div>
    </div>
  );
}
