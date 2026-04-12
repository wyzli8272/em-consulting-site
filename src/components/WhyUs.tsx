"use client";

import { motion } from "framer-motion";

interface WhyUsProps {
  translations: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

export default function WhyUs({ translations }: WhyUsProps) {
  return (
    <section id="why-us" className="px-6 py-20 md:py-28" aria-labelledby="why-us-heading">
      <div className="mx-auto max-w-[1200px]">
        <motion.h2
          id="why-us-heading"
          className="font-display text-3xl font-bold text-navy md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.title}
        </motion.h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
          {translations.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="mb-4 h-px w-12 bg-gold" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-navy md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[520px] text-base leading-relaxed text-navy/70 font-chinese">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
