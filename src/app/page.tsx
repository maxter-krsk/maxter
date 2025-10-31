"use client";
import {
  FlipButton,
  FlipButtonBack,
  FlipButtonFront,
} from "@/components/animate-ui/components/buttons/flip";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/lib/ui/separator";
import ThemeToggler from "@/lib/ui/ThemeToggler";
import { HoverFlipNavLink } from "@/animate-ui/components/buttons/link-flip";
import { Button } from "@/lib/ui/button";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section>
      <div className="container flex flex-col gap-50">
        <Button className="uppercase">Оставить заявку</Button>
        <ThemeToggler
          variant="default"
          size="lg"
          direction="ltr"
          system={false}
        />
        <Separator />
        <div className="flex gap-20 uppercase">
          <HoverFlipNavLink href="/">Меню</HoverFlipNavLink>
          <HoverFlipNavLink href="/">Портфолио</HoverFlipNavLink>
          <HoverFlipNavLink href="/">О нас</HoverFlipNavLink>
          <HoverFlipNavLink href="/">Контакты</HoverFlipNavLink>
        </div>
      </div>
    </section>
  );
}
