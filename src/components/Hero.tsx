"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { EASE_OUT as ease } from "@/lib/motion";
import { CALENDLY_URL } from "@/lib/constants";

// Hero CTA is intentionally NOT wrapped in motion.* — it's inside the LCP
// candidate region, so opacity animations would delay the largest paint.
// The subtitle's subtle fade-in is fine; the button must be static.

interface HeroProps {
  translations: {
    sectionTag: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaSubtext: string;
  };
}

export default function Hero({ translations }: HeroProps) {
  // `initial={false}` when reduced-motion is preferred makes Framer render
  // elements directly at the target state with no invisible initial frame.
  // Required to fully honor WCAG 2.3.3 — MotionConfig(reducedMotion="user")
  // zeroes the transition duration but leaves `initial` applied, which
  // can still produce a one-frame flash at opacity: 0 on slow devices.
  const shouldReduce = useReducedMotion();
  return (
    <section
      className="relative flex min-h-[100dvh] items-end bg-ink px-6 overflow-hidden pb-24 md:pb-32"
      aria-labelledby="hero-heading"
    >
      {/* Campus photo background. quality={85} on the hero (default is 75)
          because this is the LCP image — a little extra weight is worth it
          for perceived quality of the first visual impression. */}
      <Image
        src="/images/46205966351_7ca2cd4681_k.webp"
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 40%" }}
      />

      {/* Gradient overlay — to-ink/55 → to-ink/70 so right-edge text clears
          the campus photo cleanly even at tablet widths where text extends
          farther into the image than on desktop. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70"
        aria-hidden="true"
      />

      {/* Content block — bottom-aligned for editorial feel */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] pt-28">
        <div className="max-w-[820px]">
          {/* Brand section tag */}
          <span className="section-tag text-gold">
            {translations.sectionTag}
          </span>

          {/* H1 — static render for fast LCP; serif display, no font-bold (The Seasons weight 400 only) */}
          <h1
            id="hero-heading"
            className="mt-5 font-display text-display text-white"
          >
            {translations.title}
          </h1>

          {/* Gold accent rule — one accent per section */}
          <div className="accent-rule mt-8" aria-hidden="true" />

          {/* Subtitle */}
          <m.p
            className="mt-6 max-w-[560px] text-body-xl text-white/80 font-chinese"
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            {translations.subtitle}
          </m.p>

          {/* CTA — static (no initial opacity:0 + delay) so the above-the-fold
              primary action is part of LCP paint, not a post-hydration flash */}
          <div className="mt-10">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold px-8 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:bg-gold/85"
            >
              {translations.cta}
            </a>
            <p className="mt-3 text-sm text-white/70 font-chinese">
              {translations.ctaSubtext}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
