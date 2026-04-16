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
    sectionTag: string;
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

const ease = [0.16, 1, 0.3, 1] as const;

function MemberCard({
  member,
  offset,
}: {
  member: TeamMember;
  offset?: boolean;
}) {
  const photoKey = Object.keys(photos).find((k) => member.name.startsWith(k));
  const photo = photoKey ? photos[photoKey] : undefined;

  return (
    <div className={offset ? "md:mt-20" : ""}>
      <div className="relative mb-6 aspect-[4/5] w-full max-w-[380px] overflow-hidden bg-navy/5 group">
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            style={{ objectPosition: photo.position }}
            loading="lazy"
          />
        )}
      </div>
      <h3 className="text-subtitle font-display text-navy">{member.name}</h3>
      <p className="mt-1 text-sm text-navy/55">{member.role}</p>
      <ul className="mt-4 space-y-2" role="list">
        {member.credentials.map((cred, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-body-lg text-navy/65 font-chinese"
          >
            <span
              className="mt-2.5 block h-1 w-1 shrink-0 bg-gold"
              aria-hidden="true"
            />
            {cred}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Team({ translations }: TeamProps) {
  return (
    <section
      id="team"
      className="bg-white px-6 py-24 md:py-32"
      aria-labelledby="team-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-tag text-navy/40">
            {translations.sectionTag}
          </span>
          <div className="accent-rule mt-4" aria-hidden="true" />
          <h2
            id="team-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
          >
            <MemberCard member={translations.eric} />
          </motion.div>

          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <MemberCard member={translations.mary} offset />
          </motion.div>
        </div>

        <motion.p
          className="mt-16 text-center text-body-lg text-navy/55 font-chinese"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          {translations.together}
        </motion.p>
      </div>
    </section>
  );
}
