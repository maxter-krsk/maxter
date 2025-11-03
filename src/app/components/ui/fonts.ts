import { Roboto } from "next/font/google";
import { Unbounded } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const unbounded = Unbounded({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});