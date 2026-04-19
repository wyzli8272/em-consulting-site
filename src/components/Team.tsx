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
      {/* Placeholder color matches the surrounding cream section background
          instead of `bg-navy/5` — during lazy image paint on cream surfaces
          the navy tint read as a loading-state smudge, not a reserved space.
          `aspect-[4/5]` alone already reserves the layout slot; matching the
          parent bg means the placeholder is invisible until the image paints. */}
      <div className="relative mb-6 aspect-[4/5] w-full max-w-[380px] overflow-hidden bg-cream">
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
      <ul className="mt-4 space-y-2">
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

        {/* Together note — full-width row, centered under the partner cards.
            Round 6 replaced the 48px gold accent-rule above it with a 192px
            hairline at `navy/15`. The gold rule's size + saturation read as
            "new section starting," not "these two work together as a unit"
            — the UI audit flagged it as an orphan mid-page header. A longer,
            quieter hairline anchors the center-aligned prose without
            competing with the section-start accent-rules that sit under every
            actual section tag elsewhere on the page. */}
        <m.div
          className="mt-16 flex flex-col items-center"
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <div className="h-px w-48 bg-navy/15" aria-hidden="true" />
          <p className="mt-6 max-w-[520px] text-center text-body-lg text-navy/75 font-chinese">
            {translations.together}
          </p>
        </m.div>
      </div>
    </section>
  );
}
