"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface School {
  name: string;
  logo: string | null;
}

interface Stat {
  value: string;
  label: string;
  detail: string;
}

interface TrackRecordProps {
  translations: {
    sectionTag: string;
    title: string;
    subtitle: string;
    schools: School[];
    stats: Stat[];
    testimonial: {
      quote: string;
      attribution: string;
    };
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function TrackRecord({ translations }: TrackRecordProps) {
  return (
    <section
      id="track-record"
      className="px-6 py-24 md:py-32"
      aria-labelledby="track-record-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
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
            id="track-record-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
          <p className="mt-4 max-w-[600px] text-body-lg text-navy/60 font-chinese">
            {translations.subtitle}
          </p>
        </motion.div>

        {/* School admissions — each with logo + name */}
        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-6">
          {translations.schools.map((school, i) => (
            <motion.div
              key={school.name}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
            >
              {school.logo && (
                <div className="relative h-8 w-8 shrink-0 grayscale opacity-70">
                  <Image
                    src={school.logo}
                    alt=""
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-sm font-medium text-navy/70 font-chinese">
                {school.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          {translations.stats.map((stat) => (
            <div key={stat.label}>
              <span className="font-display text-headline text-navy">
                {stat.value}
              </span>
              <p className="mt-2 text-sm font-medium text-navy/70 font-chinese">
                {stat.label}
              </p>
              {stat.detail && (
                <p className="mt-1 text-sm text-navy/45 font-chinese">
                  {stat.detail}
                </p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Testimonial — only renders when quote is provided */}
        {translations.testimonial.quote && (
          <motion.blockquote
            className="mt-16 border-l-2 border-gold/40 pl-6 md:pl-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="max-w-[640px] text-body-xl italic text-navy/70 font-chinese">
              &ldquo;{translations.testimonial.quote}&rdquo;
            </p>
            <cite className="mt-4 block text-sm not-italic text-navy/50 font-chinese">
              — {translations.testimonial.attribution}
            </cite>
          </motion.blockquote>
        )}
      </div>
    </section>
  );
}
