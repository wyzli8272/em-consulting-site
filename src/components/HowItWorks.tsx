"use client";

import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  translations: {
    title: string;
    steps: Step[];
  };
}

export default function HowItWorks({ translations }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="bg-white px-6 py-20 md:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.h2
          id="how-it-works-heading"
          className="font-display text-3xl font-bold text-navy md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.title}
        </motion.h2>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div
            className="absolute left-6 top-0 hidden h-full w-px bg-gold/30 md:left-1/2 md:block md:-translate-x-1/2"
            aria-hidden="true"
          />
          <div
            className="absolute left-6 top-0 block h-full w-px bg-gold/30 md:hidden"
            aria-hidden="true"
          />

          <div className="grid gap-16 md:grid-cols-3 md:gap-12">
            {translations.steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative pl-16 md:pl-0 md:text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Step number — mobile left-aligned, desktop centered */}
                <span className="absolute left-0 top-0 font-display text-5xl font-bold text-gold md:static md:mb-4 md:block md:text-5xl">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink/70 font-chinese">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
