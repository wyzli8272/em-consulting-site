"use client";

import { motion } from "framer-motion";

interface ProcessProps {
  translations: {
    title: string;
    milestones: Array<{
      number: string;
      title: string;
      timeline: string;
      deliverable: string;
    }>;
  };
}

export default function Process({ translations }: ProcessProps) {
  return (
    <section
      id="process"
      className="bg-white px-6 py-20 md:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.h2
          id="process-heading"
          className="font-display text-3xl font-bold text-navy md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.title}
        </motion.h2>

        <div className="mt-16 space-y-0">
          {translations.milestones.map((milestone, i) => (
            <motion.div
              key={milestone.number}
              className="group relative flex gap-6 md:gap-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Timeline line and dot */}
              <div className="flex flex-col items-center" aria-hidden="true">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold text-sm font-medium text-navy">
                  {milestone.number}
                </div>
                {i < translations.milestones.length - 1 && (
                  <div className="w-px grow bg-gold/30" />
                )}
              </div>

              {/* Content */}
              <div className="pb-12 pt-1.5">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-navy">
                    {milestone.title}
                  </h3>
                  <span className="text-sm text-navy/50">
                    {milestone.timeline}
                  </span>
                </div>
                <p className="mt-2 max-w-[520px] text-base leading-relaxed text-navy/70 font-chinese">
                  {milestone.deliverable}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
