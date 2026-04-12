import localFont from "next/font/local";
import { Noto_Sans_SC } from "next/font/google";

export const displayFont = localFont({
  src: "../../public/fonts/the-seasons-regular.ttf",
  variable: "--font-the-seasons",
  display: "swap",
  weight: "400",
});

export const bodyFont = localFont({
  src: "../../public/fonts/HelveticaNowDisplay-Regular.ttf",
  variable: "--font-helvetica-now",
  display: "swap",
  weight: "400",
});

export const chineseFont = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  weight: ["400", "500", "700"],
});
