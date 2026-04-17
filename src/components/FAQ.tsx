"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE_OUT as ease } from "@/lib/motion";

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

export default function FAQ({ translations }: FAQProps) {
  const shouldReduce = useReducedMotion();
  return (
    <section
      id="faq"
      className="bg-cream section-standard px-6"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1200px] md:grid md:grid-cols-12 md:gap-12">
        {/* Left rail — breaks opener pattern, uses numbered roman-style marker */}
        <m.div
          className="md:col-span-4 md:sticky md:top-28 md:self-start"
          initial={shouldReduce ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-tag text-navy/70">
            {translations.sectionTag}
          </span>
          <div className="accent-rule mt-4" aria-hidden="true" />
          <h2
            id="faq-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
        </m.div>

        {/* Right column — details/summary accordion, no JS needed.
            ul/li wrap is critical: screen readers announce "list of N items"
            which they cannot derive from a bare stack of details elements. */}
        <ul
          role="list"
          className="mt-12 md:col-span-8 md:mt-0 divide-y divide-navy/10 list-none"
        >
          {translations.items.map((item, i) => (
            <li key={item.q}>
              <m.details
                className="group py-6"
                initial={shouldReduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease,
                }}
              >
                <summary className="faq-summary flex cursor-pointer items-start justify-between gap-6 text-left">
                  <div className="flex gap-5">
                    <span
                      className="font-display text-sm text-navy/40 pt-1 tabular-nums shrink-0 w-6"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-subtitle font-display text-navy group-hover:text-navy/75 transition-colors">
                      {item.q}
                    </span>
                  </div>
                  <svg
                    className="faq-chevron shrink-0 mt-2 h-5 w-5 text-navy/70 transition-transform duration-300"
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
              </m.details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
