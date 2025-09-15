import Logo from "@/app/ui/Logo";
import Link from "next/link";
import NavMenuHeader from "./NavMenuHeader";
import { unbounded } from "@/app/ui/fonts";
import { Grid } from "@mui/material";
export default function Header() {
  return (
    <header className={`${unbounded.className}`}>
      <div className="container">
        <Grid
          container
          spacing="grow"
          className=" in-h-[3rem] border-b-1 border-l-1 border-r-1 border-black"
        >
          <Grid className="flex justify-center p-[0.625rem] border-r-1 border-black">
            <Logo />
          </Grid>
          <Grid
            className="border-r-1 border-black flex items-center justify-start pl-3"
            size="grow"
          >
            <span
              className="uppercase font-bold text-2xl text-[#423060]"
            >
              maxter
            </span>
          </Grid>
          <Grid
            className="border-r-1 border-black flex items-center justify-center"
            size="auto"
          >
            <nav>
              <NavMenuHeader />
            </nav>
          </Grid>
          <Grid
            className="flex flex-col items-center justify-evenly"
            size="grow"
          >
              <Link className="uppercase border-b-1 border-black w-full text-center pb-[0.375rem]" href="mailto:maxter24@yandex.ru">
                maxter24@yandex.ru
              </Link>
              <Link href="tel:+79230198369">
                +7 (923) 019-83-69
              </Link>
          </Grid>
          <Grid
            size="grow"
            className="flex items-center justify-center text-center border-l-1 border-black"
          >
            <Link href="/" className="uppercase">
              Оставить
              <br />
              заявку
            </Link>
          </Grid>
        </Grid>
      </div>
    </header>
  );
}
