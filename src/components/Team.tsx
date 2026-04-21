"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import {
  EASE_OUT as ease,
  DEFAULT_VIEWPORT,
  NEAR_VIEWPORT,
  INSIDE_VIEWPORT,
} from "@/lib/motion";

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
//
// Round 12 headshot alignment (per Eric's directive + Mary's manual audit):
// Eric's head was sitting significantly higher in his frame than Mary's,
// producing a visible vertical offset between the two heads when rendered
// side-by-side. The frames share `aspect-[4/5]`, so alignment is driven
// entirely by `objectPosition`. Prior values: Eric 20%, Mary 15%. Mary's
// original framing kept her head near the top of the frame (15% = show
// more of the top area), while Eric's at 20% also showed a lot of top.
// Because Eric's source photo actually has his head POSITIONED HIGH in
// the crop, showing more-of-the-top meant his head kept climbing higher
// on the page. Fix: INCREASE Eric's objectPosition to show LESS of the
// top (pushes his head down toward center of the visible frame). Keeping
// Mary at 15%; moving Eric to 35% is the first iteration — if the heads
// are still more than 6px apart at 1440×900, iterate. This is a data-
// driven alignment; the percentages here directly trade off with where
// the head lands in the viewport.
const photos: Record<string, { src: string; position: string }> = {
  Eric: { src: "/images/eric.jpg", position: "center 35%" },
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
          viewport={DEFAULT_VIEWPORT}
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
            viewport={NEAR_VIEWPORT}
            transition={{ duration: 0.7, ease }}
          >
            <MemberCard member={translations.eric} />
          </m.div>

          <m.div
            className="md:col-span-6"
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={NEAR_VIEWPORT}
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
          viewport={INSIDE_VIEWPORT}
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
