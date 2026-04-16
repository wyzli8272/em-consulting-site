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
      className="relative flex min-h-[100dvh] items-center bg-ink px-6 overflow-hidden"
      aria-label={translations.title}
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

      {/* Multi-stop gradient overlay — dark left for text readability, lighter right for photo */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30"
        aria-hidden="true"
      />

      {/* Content — left-aligned, 7/12 column */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] py-32">
        <div className="max-w-[640px]">
          <motion.span
            className="section-tag text-gold"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {translations.sectionTag}
          </motion.span>

          <motion.h1
            className="mt-4 font-display text-display text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            {translations.title}
          </motion.h1>

          <motion.p
            className="mt-6 text-body-xl text-white/70 font-chinese"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {translations.subtitle}
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold px-8 py-3.5 text-base font-medium text-ink transition-all duration-300 hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(255,214,10,0.25)]"
            >
              {translations.cta}
            </a>
            <p className="mt-3 text-sm text-white/50 font-chinese">
              {translations.ctaSubtext}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
