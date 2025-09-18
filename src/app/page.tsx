import { div } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { unbounded } from "./ui/fonts";

export default function Home() {
  return (
    <div className="container">
      <div className="border border-black pb-20">
        <h1
          className={`${unbounded.className} pt-20 uppercase text-center font-black text-5xl`}
        >
          Ваш digital‑партнёр в маркетинге и PR
        </h1>
        <ul className="flex gap-x-10 justify-center pt-10 pb-10">
          <li className="border-black border-r-1 border-black pr-10">
            <h2 className={`${unbounded.className} uppercase font-bold`}>
              адрес
            </h2>
            <address className="not-italic">
              Россия, г. Красноярск,
              <br />
              Улица Дубровинского, 110
              <br />
              405; 407 офис; 4 этаж
            </address>
          </li>
          <li className="border-black border-r-1 border-black pr-10">
            <h2 className={`${unbounded.className} uppercase font-bold`}>
              наши контакты
            </h2>
            <div className="flex flex-col">
              <Link className="uppercase" href="mailto:maxter24@yandex.ru">
                maxter24@yandex.ru
              </Link>
              <Link href="tel:+79230198369">+7 (923) 019-83-69</Link>
            </div>
          </li>
          <li>
            <h2 className={`${unbounded.className} uppercase font-bold`}>
              информация
            </h2>
            <p className="uppercase">* Разработка</p>
            <p className="uppercase">* Продвижение</p>
            <p className="uppercase">* Аналитика</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
