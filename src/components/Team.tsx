"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  credentials: string[];
}

interface TeamProps {
  translations: {
    title: string;
    together: string;
    eric: TeamMember;
    mary: TeamMember;
  };
  locale: string;
}

const photos: Record<string, { src: string; alt: string; position: string }> = {
  Eric: { src: "/images/eric.jpg", alt: "Eric Li", position: "center 20%" },
  Mary: { src: "/images/mary.jpg", alt: "Mary Liu", position: "center 15%" },
};

function MemberCard({ member }: { member: TeamMember }) {
  const photoKey = Object.keys(photos).find((k) => member.name.startsWith(k));
  const photo = photoKey ? photos[photoKey] : undefined;

  return (
    <div>
      <div className="relative mb-6 aspect-[4/5] w-full max-w-[280px] overflow-hidden bg-navy/5">
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="280px"
            className="object-cover"
            style={{ objectPosition: photo.position }}
            loading="lazy"
          />
        )}
      </div>
      <h3 className="text-xl font-semibold text-navy">{member.name}</h3>
      <p className="mt-1 text-sm text-navy/60">{member.role}</p>
      <ul className="mt-4 space-y-2" role="list">
        {member.credentials.map((cred, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-base leading-relaxed text-navy/75 font-chinese"
          >
            <span className="mt-2 block h-1 w-1 shrink-0 bg-gold" aria-hidden="true" />
            {cred}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Team({ translations }: TeamProps) {
  return (
    <section id="team" className="px-6 py-20 md:py-28" aria-labelledby="team-heading">
      <div className="mx-auto max-w-[1200px]">
        <motion.h2
          id="team-heading"
          className="font-display text-3xl font-bold text-navy md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.title}
        </motion.h2>

        <motion.div
          className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <MemberCard member={translations.eric} />
          <MemberCard member={translations.mary} />
        </motion.div>

        <motion.p
          className="mt-16 text-center text-base text-navy/60 font-chinese"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.together}
        </motion.p>
      </div>
    </section>
  );
}
