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

export default function Pricing({ translations, locale }: PricingProps) {
  return (
    <section
      id="pricing"
      className="px-6 py-24 md:py-32"
      aria-labelledby="pricing-heading"
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
            id="pricing-heading"
            className="mt-5 font-display text-title text-navy"
          >
            {translations.title}
          </h2>
        </motion.div>

        {/* Asymmetric cards — Full Package dominant (7-col), Audit secondary (5-col) */}
        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          {/* Full Package — dominant navy card */}
          <motion.div
            className="relative bg-navy p-8 md:col-span-7 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            {translations.full.recommended && (
              <span className="absolute top-0 right-0 bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink">
                {locale === "zh-CN" ? "推荐" : "Recommended"}
              </span>
            )}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-subtitle font-display text-white">
                {translations.full.name}
              </h3>
              <span className="text-sm text-white/35">
                {translations.full.nameEn}
              </span>
            </div>
            <div className="mt-5">
              <span className="font-display text-headline text-gold">
                {translations.full.price}
              </span>
              <span className="ml-3 text-sm text-white/40">
                {translations.full.priceRmb}
              </span>
            </div>
            <p className="mt-5 max-w-[480px] text-body-lg text-white/60 font-chinese">
              {translations.full.description}
            </p>
          </motion.div>

          {/* Audit — secondary white card */}
          <motion.div
            className="border border-navy/10 bg-white p-8 md:col-span-5 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-subtitle font-display text-navy">
                {translations.audit.name}
              </h3>
              <span className="text-sm text-navy/35">
                {translations.audit.nameEn}
              </span>
            </div>
            <div className="mt-5">
              <span className="font-display text-headline text-navy">
                {translations.audit.price}
              </span>
              <span className="ml-3 text-sm text-navy/40">
                {translations.audit.priceRmb}
              </span>
            </div>
            <p className="mt-5 max-w-[480px] text-body-lg text-navy/60 font-chinese">
              {translations.audit.description}
            </p>
          </motion.div>
        </div>

        <motion.p
          className="mt-10 text-center text-sm text-navy/45 font-chinese"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          {translations.note}
        </motion.p>
      </div>
    </section>
  );
}
