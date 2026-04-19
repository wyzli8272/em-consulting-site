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
      {/* Campus photo background. `quality={85}` gets more detail for the
          LCP image (default is 75); requires the matching `images.qualities`
          allowlist in next.config.ts — without it Next 16 silently downgrades
          to 75 (Round 6 measured `q=75` on every srcset URL despite this prop).
          `fetchPriority="high"` is passed explicitly because `priority` alone
          doesn't emit the hint in Next 16; the HTTP preload handles the Link:
          header but the element-level hint is what the browser uses to weight
          this against other priority resources during render. */}
      <Image
        src="/images/46205966351_7ca2cd4681_k.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
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

          {/* H1 — static render for fast LCP; serif display. Italiana only
              ships weight 400, and `font-synthesis: none` is set globally
              so a `font-bold` class here would synthesize nothing and
              render at 400 anyway. Display weight for zh-CN is corrected
              in globals.css via `html[lang="zh-CN"] .text-display.font-
              display` to match the optical weight of the OS CJK serif
              fallback. */}
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
              className="inline-block bg-gold px-8 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:bg-gold-hover"
            >
              {translations.cta}
            </a>
            <p className="mt-3 text-sm text-white/70 font-chinese">
              {translations.ctaSubtext}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile-only scroll affordance. A parent scanning 375×667 sees
          the CTA ~60 px from the bottom with no cue that 7 more sections
          live below — the downward chevron + gentle bob is a quiet
          signal to keep scrolling. Fades on scroll (CSS-only, no JS) so
          it disappears the moment it's been understood. Hidden from AT
          since the skip-link + main content are the authoritative paths;
          `aria-hidden` prevents it from being announced as orphaned
          decoration. */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden"
        aria-hidden="true"
      >
        <m.div
          className="flex flex-col items-center gap-1 text-white/60"
          initial={shouldReduce ? false : { opacity: 0, y: 6 }}
          animate={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
        >
          {/* Chevron bob: finite (2 repeats with reverse, so 3 total up-
              and-back cycles) — an affordance that asks for attention and
              then stops, rather than one that loops forever. `Infinity`
              was flagged in Round 6 as reading "processing spinner" to
              some users. Under reduced-motion, `animate` explicitly
              targets `y: 0` (rest state) rather than `undefined`, which
              was ambiguous Framer semantics across minor versions. */}
          <m.svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            animate={shouldReduce ? { y: 0 } : { y: [0, 3, 0] }}
            transition={
              shouldReduce
                ? { duration: 0 }
                : {
                    duration: 1.8,
                    repeat: 2,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }
            }
          >
            <path
              d="M3.5 5.5l3.5 3.5 3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </m.svg>
        </m.div>
      </div>
    </section>
  );
}
