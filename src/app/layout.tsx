import type { Metadata } from "next";
import { roboto } from "@/app/components/ui/fonts";
import "./globals.css";
import Header from "@/app/components/shared/Header/Header";
import Footer from "@/app/components/shared/Footer/Footer";
import { CookiesBanner } from "@/app/components/ui/CookieBanner";
import { ScrollTop } from "@/app/components/ui/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { TransitionProvider } from "@/app/components/providers/TransitionProvider";

// Мета-данные

export const metadata: Metadata = {
  metadataBase: new URL("https://domain.ru"),
  alternates: { canonical: "/" },

  title: "Maxter - агентство коммуникаций",
  description: "Описание сайта",

  openGraph: {
    title: "Maxter - агентство коммуникаций",
    description: "Описание сайта для соц. сетей",
    url: "https://domain.ru",
    siteName: "Maxter - агентство коммуникаций",
    images: [
      {
        url: "/og/og-img.jpg",
        width: 1200,
        height: 630,
        alt: "Превью сайта",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxter - агентство коммуникаций",
    description: "Описание сайта для соц. сетей",
    images: ["/og/og-img.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/icons/favicons/favicon-light.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/favicons/favicon-dark.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],

    apple: [{ url: "/icons/favicons/favicon-large.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${roboto.className} flex min-h-screen dark:bg-carbon flex-col overflow-x-hidden antialiased bg-paper`}
      >
        <TransitionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookiesBanner />
            <ScrollTop />
          </ThemeProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
