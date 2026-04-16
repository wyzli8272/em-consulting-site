"use client";

import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  translations: {
    sectionTag: string;
    title: string;
    steps: Step[];
  };
}

const ease = [0.16, 1, 0.3, 1] as const;
const offsets = ["", "md:mt-12", ""];

export default function HowItWorks({ translations }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="bg-white px-6 py-24 md:py-32"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-tag text-navy/40">
            {translations.sectionTag}
          </span>
          <div className="accent-rule mt-4" aria-hidden="true" />
          <h2
            id="how-it-works-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {translations.steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={`relative ${offsets[i] || ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease,
              }}
            >
              {/* Oversized watermark number */}
              <span
                className="pointer-events-none select-none font-display text-[8rem] leading-none text-gold/10 md:text-[10rem]"
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Content overlapping the watermark */}
              <div className="-mt-14 md:-mt-18">
                <h3 className="text-subtitle font-display text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-body-lg text-navy/65 font-chinese">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
