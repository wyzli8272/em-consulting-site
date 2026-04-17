"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE_OUT as ease } from "@/lib/motion";

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

export default function WhyUs({ translations }: WhyUsProps) {
  const shouldReduce = useReducedMotion();
  return (
    <section
      id="why-us"
      className="section-compact px-6"
      aria-labelledby="why-us-heading"
    >
      <div className="mx-auto max-w-[1200px] md:grid md:grid-cols-12 md:gap-12">
        {/* Left column — sticky heading */}
        <m.div
          className="md:col-span-5 md:sticky md:top-28 md:self-start"
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
            id="why-us-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
        </m.div>

        {/* Right column — numbered items (no side-stripe borders per impeccable) */}
        <ol className="mt-12 space-y-12 md:col-span-7 md:mt-0">
          {translations.items.map((item, i) => (
            <m.li
              key={item.title}
              className="flex gap-6"
              initial={shouldReduce ? false : { opacity: 0, y: 24 }}
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
                className="font-display text-2xl text-navy/40 pt-1 tabular-nums shrink-0 w-10"
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
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
