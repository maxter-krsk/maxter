import type { Metadata } from "next";
import { roboto } from "@/app/ui/fonts";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Maxter - Digital-партнёр",
  description:
    "Мы не просто выполняем поставленные задачи, мы глубоко погружаемся в ваш бизнес, ищем нестандартные решения и предлагаем идеи, которые изменят правила игры.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${roboto.className} flex flex-col min-h-screen overflow-x-hidden`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
