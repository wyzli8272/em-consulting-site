"use client";

import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

interface ContactProps {
  translations: {
    sectionTag: string;
    title: string;
    cta: string;
    ctaDescription: string;
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact({ translations }: ContactProps) {
  return (
    <section
      id="contact"
      className="border-t border-gold/20 bg-ink px-6 py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          className="mx-auto max-w-[640px] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-tag text-gold">
            {translations.sectionTag}
          </span>
          <h2
            id="contact-heading"
            className="mt-5 font-display text-title text-white"
          >
            {translations.title}
          </h2>
          <p className="mt-4 text-body-xl text-white/55 font-chinese">
            {translations.ctaDescription}
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block bg-gold px-10 py-4 text-base font-medium text-ink transition-all duration-300 hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(255,214,10,0.3)]"
          >
            {translations.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
