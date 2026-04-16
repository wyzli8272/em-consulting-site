"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface School {
  name: string;
  logo: string | null;
}

interface FounderCred {
  name: string;
  detail: string;
}

interface TrackRecordProps {
  translations: {
    sectionTag: string;
    title: string;
    subtitle: string;
    founderCredsLabel: string;
    founderCreds: FounderCred[];
    mentorshipLabel: string;
    schools: School[];
    testimonial: {
      quote: string;
      attribution: string;
    };
    antiObjection: string;
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function TrackRecord({ translations }: TrackRecordProps) {
  return (
    <section
      id="advisory-experience"
      className="section-standard px-6"
      aria-labelledby="advisory-heading"
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
            id="advisory-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
          <p className="mt-5 max-w-[720px] text-body-lg text-navy/75 font-chinese">
            {translations.subtitle}
          </p>
        </motion.div>

        {/* Block A: Founder credentials — primary proof */}
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-12 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="md:col-span-4">
            <span className="section-tag text-navy/70">
              {translations.founderCredsLabel}
            </span>
          </div>
          <ul className="md:col-span-8 space-y-6" role="list">
            {translations.founderCreds.map((cred) => (
              <li key={cred.name}>
                <p className="font-display text-subtitle text-navy">
                  {cred.name}
                </p>
                <p className="mt-1 text-body-lg text-navy/75 font-chinese">
                  {cred.detail}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Divider rule */}
        <div
          className="mt-16 h-px w-full bg-navy/10"
          aria-hidden="true"
        />

        {/* Block B: Eric's mentorship — schools as prose list, not a logo bar */}
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-12 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="md:col-span-4">
            <span className="section-tag text-navy/70">
              {translations.mentorshipLabel}
            </span>
          </div>
          <ul
            className="md:col-span-8 divide-y divide-navy/10"
            role="list"
          >
            {translations.schools.map((school) => (
              <li
                key={school.name}
                className="flex items-center gap-4 py-4"
              >
                {school.logo ? (
                  <div className="relative h-10 w-10 shrink-0 grayscale opacity-60">
                    <Image
                      src={school.logo}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 shrink-0" aria-hidden="true" />
                )}
                <span className="text-body-lg text-navy font-chinese">
                  {school.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Block C: Testimonial — oversized decorative quote mark, no border-stripe */}
        {translations.testimonial.quote && (
          <motion.figure
            className="mt-20 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span
              className="absolute -top-6 -left-2 md:-top-10 md:-left-6 font-display text-[8rem] md:text-[12rem] leading-none text-gold/20 select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="relative md:pl-12">
              <p className="max-w-[760px] text-body-xl italic text-navy/80 font-chinese">
                {translations.testimonial.quote}
              </p>
              <figcaption className="mt-6 text-sm text-navy/65 font-chinese not-italic">
                — {translations.testimonial.attribution}
              </figcaption>
            </blockquote>
          </motion.figure>
        )}

        {/* Anti-objection framing — from Eric's project brief */}
        <motion.p
          className="mt-16 max-w-[720px] font-display text-subtitle text-navy/85 italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          {translations.antiObjection}
        </motion.p>
      </div>
    </section>
  );
}
