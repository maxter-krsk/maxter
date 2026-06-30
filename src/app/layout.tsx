import type { Metadata } from "next";
import { roboto, unbounded } from "@/app/components/ui/fonts";
import "./globals.css";
import Header from "@/app/components/shared/Header/Header";
import Footer from "@/app/components/shared/Footer/Footer";
import { CookiesBanner } from "@/app/components/ui/CookieBanner";
import { ScrollTop } from "@/app/components/ui/ScrollToTop";
import { PageTransitionCurtains } from "@/app/components/ui/PageTransitionCurtains";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/lib/ui/sonner";
import { siteMetadata } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteMetadata.title} - агентство коммуникаций`,
  description: siteMetadata.description,
  twitter: {
    card: "summary_large_image",
    title: `${siteMetadata.title} - агентство коммуникаций`,
    description: siteMetadata.description,
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
        className={`${roboto.className} ${roboto.variable} ${unbounded.variable} flex min-h-screen text-carbon dark:text-paper dark:bg-carbon flex-col overflow-x-hidden antialiased bg-paper`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageTransitionCurtains />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookiesBanner />
          <ScrollTop />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
