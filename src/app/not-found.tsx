import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  // 404 lives outside the [locale] segment and therefore doesn't inherit
  // metadataBase from the locale layout — set it explicitly so any sibling
  // OG / icon assets resolve to absolute URLs in Next's build log.
  metadataBase: new URL(SITE_URL),
  title: "Not found — EM Consulting",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-ink px-6 text-center"
      role="main"
    >
      <span className="section-tag text-gold">404</span>
      <div className="accent-rule mt-4 mx-auto" aria-hidden="true" />
      <h1 className="mt-6 font-display text-title text-white">Not found.</h1>
      <p className="mt-4 max-w-[480px] text-body-lg text-white/70">
        The page you are looking for has moved or never existed.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block bg-gold px-8 py-3.5 text-base font-medium text-ink transition-all duration-300 hover:bg-gold/90"
      >
        Return home
      </Link>
    </main>
  );
}
