import { Lalezar, Roboto, Ubuntu, Vazirmatn } from "next/font/google";

export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
});

export const lalezar = Lalezar({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lalezar",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
});

export const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const fontVariables = `${vazirmatn.variable} ${lalezar.variable} ${roboto.variable} ${ubuntu.variable}`;
