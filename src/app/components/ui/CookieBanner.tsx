"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_COOKIE = "cookie-consent=true";
const COOKIE_MAX_AGE_DAYS = 6;

export default function CookiesBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = document.cookie.includes("cookie-consent=");
    if (!hasConsent) setVisible(true);
  }, []);

  const accept = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_MAX_AGE_DAYS);
    document.cookie = `${CONSENT_COOKIE}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    setVisible(false);
  };

  return (
    visible && (
      <div className="fixed right-0 bottom-0 left-0 p-0 md:right-auto md:bottom-6 md:left-1/2 md:mx-auto md:w-[calc(100%-2rem)] md:max-w-2xl md:-translate-x-1/2 md:p-2">
        <div className="bg-blue-300">
          <div className="flex flex-col gap-4 p-4">
            <p className="text-14 text-center leading-relaxed text-gray-800">
              Продолжая просмотр сайта, вы соглашаетесь с использованием cookie
              в соответствии с нашей{" "}
              <Link
                href="/cookie-policy"
                className="font-medium text-black underline"
              >
                Политикой в отношении обработки cookie-файлов
              </Link>
            </p>
            <div className="flex justify-center">
              <button
                onClick={accept}
                className="rounded-30 bg-sand cursor-pointer bg-amber-500 p-2 transition-colors duration-500 hover:shadow-lg"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
