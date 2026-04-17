"use client";

import { m } from "framer-motion";
import { EASE_OUT as ease } from "@/lib/motion";

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

export default function Process({ translations }: ProcessProps) {
  return (
    <section
      id="process"
      className="bg-navy section-standard px-6"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <m.div
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
        </m.div>

        {/* space-y-14 on the list, not pb-14 on each inner div — removes
            trailing dead space below the final milestone. */}
        <ol className="mt-16 space-y-14">
          {translations.milestones.map((milestone, i) => (
            <m.li
              key={milestone.number}
              className="relative flex gap-6 md:gap-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease,
              }}
            >
              {/* Italiana numeral alone — no chip, no connector.
                  Brand discipline: gold is the accent, not decoration. */}
              <span
                className="font-display text-6xl md:text-7xl leading-none tabular-nums text-gold-muted shrink-0 w-14 md:w-20 pt-1"
                aria-hidden="true"
              >
                {milestone.number}
              </span>

              <div>
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
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
