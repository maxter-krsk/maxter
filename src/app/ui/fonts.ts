import { Roboto } from "next/font/google";
import { Unbounded } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "700"],
  subsets: ["latin"],
});

export const unbounded = Unbounded({
  weight: ["300", "400", "700", "800"],
  subsets: ["latin"],
});
