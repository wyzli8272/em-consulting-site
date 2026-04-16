"use client";

import { motion } from "framer-motion";

interface WhyUsProps {
  translations: {
    sectionTag: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function WhyUs({ translations }: WhyUsProps) {
  return (
    <section
      id="why-us"
      className="section-standard px-6"
      aria-labelledby="why-us-heading"
    >
      <div className="mx-auto max-w-[1200px] md:grid md:grid-cols-12 md:gap-12">
        {/* Left column — sticky heading */}
        <motion.div
          className="md:col-span-5 md:sticky md:top-28 md:self-start"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-tag text-gold">
            {translations.sectionTag}
          </span>
          <div className="accent-rule mt-4" aria-hidden="true" />
          <h2
            id="why-us-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
        </motion.div>

        {/* Right column — numbered items (no side-stripe borders per impeccable) */}
        <ol className="mt-12 space-y-12 md:col-span-7 md:mt-0">
          {translations.items.map((item, i) => (
            <motion.li
              key={i}
              className="flex gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease,
              }}
            >
              {/* Leading number — subtle typographic marker, not a decoration */}
              <span
                className="font-display text-2xl text-gold/70 pt-1 tabular-nums shrink-0 w-10"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-subtitle font-display text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[520px] text-body-lg text-navy/80 font-chinese">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
