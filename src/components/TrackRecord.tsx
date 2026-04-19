"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import {
  EASE_OUT as ease,
  DEFAULT_VIEWPORT,
  NEAR_VIEWPORT,
} from "@/lib/motion";

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

export default function TrackRecord({ translations }: TrackRecordProps) {
  const shouldReduce = useReducedMotion();
  return (
    <section
      id="advisory-experience"
      className="section-standard px-6"
      aria-labelledby="advisory-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <m.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-tag text-navy/70">
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
        </m.div>

        {/* Block A: Founder credentials — primary proof */}
        <m.div
          className="mt-16 grid gap-8 md:grid-cols-12 md:gap-12"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={NEAR_VIEWPORT}
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
        </m.div>

        {/* Divider rule */}
        <div
          className="mt-16 h-px w-full bg-navy/10"
          aria-hidden="true"
        />

        {/* Block B: Eric's mentorship — schools as prose list, not a logo bar */}
        <m.div
          className="mt-16 grid gap-8 md:grid-cols-12 md:gap-12"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={NEAR_VIEWPORT}
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
                  <Image
                    src={school.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 object-contain grayscale opacity-60"
                  />
                ) : (
                  <div className="h-10 w-10 shrink-0" aria-hidden="true" />
                )}
                <span className="text-body-lg text-navy font-chinese">
                  {school.name}
                </span>
              </li>
            ))}
          </ul>
        </m.div>

        {/* Block C: Testimonial — oversized decorative quote mark, no border-stripe */}
        {translations.testimonial.quote && (
          <m.figure
            className="mt-20 relative"
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={NEAR_VIEWPORT}
            transition={{ duration: 0.6, ease }}
          >
            {/* Decorative oversized quote mark. Round 5 cropped 8rem → 5rem
                on mobile to fix overflow, but 5rem was smaller than the
                testimonial body text and lost its decorative function —
                the audit read it as typeset punctuation, not an editorial
                flourish. 6rem on mobile stays inside viewport while
                keeping the glyph visibly larger than the quote body. */}
            <span
              className="absolute -top-6 -left-2 md:-top-10 md:-left-6 font-display text-[6rem] md:text-[12rem] leading-none text-gold-whisper select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="relative md:pl-12">
              <p className="max-w-[760px] text-body-xl italic text-navy/80 font-chinese">
                {translations.testimonial.quote}
              </p>
              {/* Attribution split across two lines so the "mentored
                  before EM Consulting" caveat gets its own typographic
                  weight — this is the honesty signal that protects the
                  site's credibility (the Duke '29 quote predates the
                  firm) and should read as intentional transparency,
                  not a hidden footnote. The attribution line renders
                  the school; the caveat line renders the framing. */}
              <figcaption className="mt-6 font-chinese not-italic">
                {(() => {
                  const parts = translations.testimonial.attribution.split(
                    /\s*·\s*/,
                  );
                  const [who, ...rest] = parts;
                  const caveat = rest.join(" · ");
                  return (
                    <>
                      <span className="block text-sm text-navy/70">
                        — {who}
                      </span>
                      {caveat && (
                        // text-sm + text-navy/75 clears WCAG 4.5:1 on
                        // cream (≈5.6:1). Round 6 Commit 6 shipped this
                        // at text-xs/navy-55 which computed to 3.19:1
                        // — a WCAG 1.4.3 fail. The split still visually
                        // subordinates the caveat (smaller + lighter
                        // than the school line above), but stays
                        // legible for screen-carriers and for readers
                        // with low-contrast displays.
                        <span className="mt-1 block text-sm tracking-wide text-navy/75">
                          {caveat}
                        </span>
                      )}
                    </>
                  );
                })()}
              </figcaption>
            </blockquote>
          </m.figure>
        )}

        {/* Anti-objection framing — from Eric's project brief */}
        <m.p
          className="mt-16 max-w-[720px] font-display text-subtitle text-navy/85 italic"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={NEAR_VIEWPORT}
          transition={{ duration: 0.6, ease }}
        >
          {translations.antiObjection}
        </m.p>
      </div>
    </section>
  );
}
