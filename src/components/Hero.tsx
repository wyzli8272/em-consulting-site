"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

interface HeroProps {
  translations: {
    sectionTag: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaSubtext: string;
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({ translations }: HeroProps) {
  return (
    <section
      className="relative flex min-h-[100dvh] items-end bg-ink px-6 overflow-hidden pb-24 md:pb-32"
      aria-labelledby="hero-heading"
    >
      {/* Campus photo background */}
      <Image
        src="/images/46205966351_7ca2cd4681_k.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 40%" }}
      />

      {/* Gradient overlay — tightened so tablet-width text stays readable */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/55"
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
          <motion.p
            className="mt-6 max-w-[560px] text-body-xl text-white/80 font-chinese"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            {translations.subtitle}
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold px-8 py-3.5 text-base font-medium text-ink transition-all duration-300 hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(255,214,10,0.25)]"
            >
              {translations.cta}
            </a>
            <p className="mt-3 text-sm text-white/70 font-chinese">
              {translations.ctaSubtext}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
