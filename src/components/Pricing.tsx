"use client";

import { motion } from "framer-motion";

interface PricingTier {
  name: string;
  nameEn: string;
  price: string;
  priceRmb: string;
  description: string;
  recommended?: boolean;
}

interface PricingProps {
  translations: {
    sectionTag: string;
    title: string;
    note: string;
    audit: PricingTier;
    full: PricingTier;
  };
  locale: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function Pricing({ translations }: PricingProps) {
  return (
    <section
      id="pricing"
      className="section-standard px-6"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-[1200px] md:grid md:grid-cols-12 md:gap-12">
        {/* Left rail — breaks the repeating "tag + rule + title stacked" opener pattern */}
        <motion.div
          className="md:col-span-4 md:sticky md:top-28 md:self-start"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-tag text-gold">
            {translations.sectionTag}
          </span>
          <div className="accent-rule mt-4" aria-hidden="true" />
          <h2
            id="pricing-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
          <p className="mt-6 max-w-[340px] text-body-lg text-navy/75 font-chinese">
            {translations.note}
          </p>
        </motion.div>

        {/* Right cards */}
        <div className="mt-12 md:col-span-8 md:mt-0 space-y-6">
          {/* Full Package — dominant navy card, white price (no gold dominance) */}
          <motion.article
            className="relative bg-navy p-8 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-subtitle font-display text-white">
                {translations.full.name}
              </h3>
              <span className="text-sm text-white/60">
                {translations.full.nameEn}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-display text-headline text-white">
                {translations.full.price}
              </span>
            </div>
            <p className="mt-2 text-sm text-white/65">
              {translations.full.priceRmb}
            </p>
            <p className="mt-5 max-w-[520px] text-body-lg text-white/80 font-chinese">
              {translations.full.description}
            </p>
          </motion.article>

          {/* Audit — secondary white card */}
          <motion.article
            className="border border-navy/10 bg-white p-8 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-subtitle font-display text-navy">
                {translations.audit.name}
              </h3>
              <span className="text-sm text-navy/55">
                {translations.audit.nameEn}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-display text-headline text-navy">
                {translations.audit.price}
              </span>
            </div>
            <p className="mt-2 text-sm text-navy/65">
              {translations.audit.priceRmb}
            </p>
            <p className="mt-5 max-w-[520px] text-body-lg text-navy/75 font-chinese">
              {translations.audit.description}
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
