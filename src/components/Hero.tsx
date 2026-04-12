"use client";

import { motion } from "framer-motion";

interface HeroProps {
  translations: {
    title: string;
    subtitle: string;
    cta: string;
  };
}

export default function Hero({ translations }: HeroProps) {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex min-h-[100dvh] items-center justify-center bg-ink px-6"
      aria-label={translations.title}
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <motion.h1
          className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.title}
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-[640px] text-base leading-relaxed text-white/75 font-chinese md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={scrollToContact}
            className="mt-10 inline-block bg-gold px-8 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:bg-gold/85"
          >
            {translations.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
