"use client";

import { motion } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  translations: {
    sectionTag: string;
    title: string;
    items: FAQItem[];
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function FAQ({ translations }: FAQProps) {
  return (
    <section
      id="faq"
      className="bg-white section-standard px-6"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1200px] md:grid md:grid-cols-12 md:gap-12">
        {/* Left rail — breaks opener pattern, uses numbered roman-style marker */}
        <motion.div
          className="md:col-span-4 md:sticky md:top-28 md:self-start"
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
            id="faq-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
        </motion.div>

        {/* Right column — details/summary accordion, no JS needed */}
        <div className="mt-12 md:col-span-8 md:mt-0 divide-y divide-navy/10">
          {translations.items.map((item, i) => (
            <motion.details
              key={i}
              className="group py-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease,
              }}
            >
              <summary className="flex cursor-pointer items-start justify-between gap-6 text-left">
                <div className="flex gap-5">
                  <span
                    className="font-display text-sm text-gold/70 pt-1 tabular-nums shrink-0 w-6"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-subtitle font-display text-navy group-hover:text-navy/75 transition-colors">
                    {item.q}
                  </span>
                </div>
                <svg
                  className="faq-chevron shrink-0 mt-2 h-5 w-5 text-navy/50 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M5 8l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="mt-4 pl-11">
                <p className="max-w-[640px] text-body-lg text-navy/80 font-chinese">
                  {item.a}
                </p>
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
