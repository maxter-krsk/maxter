import { Roboto } from "next/font/google";
import { Unbounded } from "next/font/google";

export const roboto = Roboto({
  weight: ["300"],
  subsets: ["latin"],
});

export const unbounded = Unbounded({
  weight: ["400", "700"],
  subsets: ["latin"],
});
