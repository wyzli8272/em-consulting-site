"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { EASE_OUT as ease } from "@/lib/motion";

interface TeamMember {
  name: string;
  role: string;
  credentials: string[];
}

interface TeamProps {
  translations: {
    sectionTag: string;
    title: string;
    together: string;
    eric: TeamMember;
    mary: TeamMember;
  };
}

// Portraits are decorative — the adjacent <h3> carries the name for screen readers.
// Keep `src` and `position` only; alt is always "" so no need to track it here.
const photos: Record<string, { src: string; position: string }> = {
  Eric: { src: "/images/eric.jpg", position: "center 20%" },
  Mary: { src: "/images/mary.jpg", position: "center 15%" },
};

function MemberCard({ member }: { member: TeamMember }) {
  const photoKey = Object.keys(photos).find((k) => member.name.startsWith(k));
  const photo = photoKey ? photos[photoKey] : undefined;

  return (
    <div>
      <div className="relative mb-6 aspect-[4/5] w-full max-w-[380px] overflow-hidden bg-navy/5">
        {photo && (
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover"
            style={{ objectPosition: photo.position }}
            loading="lazy"
            quality={80}
          />
        )}
      </div>
      <h3 className="text-subtitle font-display text-navy">{member.name}</h3>
      <p className="mt-1 text-sm text-navy/70">{member.role}</p>
      {/* Credential bullets use a middle-dot, not an em-dash, to keep
          em-dash usage scoped to sentence-level punctuation elsewhere. */}
      <ul className="mt-4 space-y-2" role="list">
        {member.credentials.map((cred) => (
          <li
            key={cred}
            className="flex items-start gap-3 text-body-lg text-navy/80 font-chinese"
          >
            <span
              className="text-navy/45 shrink-0 select-none pt-[0.1em]"
              aria-hidden="true"
            >
              ·
            </span>
            {cred}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Team({ translations }: TeamProps) {
  const shouldReduce = useReducedMotion();
  return (
    <section
      id="team"
      className="bg-cream section-standard px-6"
      aria-labelledby="team-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <m.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-tag text-navy/70">
            {translations.sectionTag}
          </span>
          <div className="accent-rule mt-4" aria-hidden="true" />
          <h2
            id="team-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
        </m.div>

        {/* Equal 6/6 grid: both partners the same visual weight.
            Plain fade-rise (no scale, no blur-in) — editorial portraits
            don't need cinematic entrances. */}
        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
          <m.div
            className="md:col-span-6"
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
          >
            <MemberCard member={translations.eric} />
          </m.div>

          <m.div
            className="md:col-span-6"
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <MemberCard member={translations.mary} />
          </m.div>
        </div>

        {/* Together note — full-width row, centered. Removed from Eric's column so the grid reads as two equal partners. */}
        <m.p
          className="mt-16 mx-auto max-w-[520px] text-center text-body-lg text-navy/70 font-chinese"
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          {translations.together}
        </m.p>
      </div>
    </section>
  );
}
