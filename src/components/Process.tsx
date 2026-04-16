"use client";

import { motion } from "framer-motion";

interface ProcessProps {
  translations: {
    sectionTag: string;
    title: string;
    milestones: Array<{
      number: string;
      title: string;
      timeline: string;
      deliverable: string;
    }>;
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function Process({ translations }: ProcessProps) {
  return (
    <section
      id="process"
      className="bg-navy section-standard px-6"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-tag text-gold">
            {translations.sectionTag}
          </span>
          <div className="accent-rule mt-4" aria-hidden="true" />
          <h2
            id="process-heading"
            className="mt-5 font-display text-title text-white"
          >
            {translations.title}
          </h2>
        </motion.div>

        <ol className="mt-16 space-y-0">
          {translations.milestones.map((milestone, i) => (
            <motion.li
              key={milestone.number}
              className="group relative flex gap-6 md:gap-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease,
              }}
            >
              {/* Outline-style timeline chip — gold as border, not fill (impeccable: gold as accent, not dominant) */}
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-gold/60 bg-white/[0.03] text-lg text-white">
                  {milestone.number}
                </div>
                {i < translations.milestones.length - 1 && (
                  <div
                    className="w-0.5 grow bg-gold/25"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="pb-14 pt-3">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-subtitle font-display text-white">
                    {milestone.title}
                  </h3>
                  <span className="text-sm text-white/70">
                    {milestone.timeline}
                  </span>
                </div>
                <p className="mt-3 max-w-[520px] text-body-lg text-white/75 font-chinese">
                  {milestone.deliverable}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
