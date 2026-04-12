"use client";

import { motion } from "framer-motion";

interface PricingTier {
  name: string;
  nameEn: string;
  price: string;
  priceRmb: string;
  description: string;
}

interface PricingProps {
  translations: {
    title: string;
    note: string;
    audit: PricingTier;
    full: PricingTier;
  };
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div className="border border-navy/10 bg-white p-8 md:p-10">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-xl font-semibold text-navy">{tier.name}</h3>
        <span className="text-sm text-navy/40">{tier.nameEn}</span>
      </div>
      <div className="mt-4">
        <span className="text-2xl font-semibold text-navy md:text-3xl">
          {tier.price}
        </span>
        <span className="ml-3 text-sm text-navy/50">{tier.priceRmb}</span>
      </div>
      <p className="mt-4 max-w-[480px] text-base leading-relaxed text-navy/70 font-chinese">
        {tier.description}
      </p>
    </div>
  );
}

export default function Pricing({ translations }: PricingProps) {
  return (
    <section
      id="pricing"
      className="bg-white px-6 py-20 md:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.h2
          id="pricing-heading"
          className="font-display text-3xl font-bold text-navy md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.title}
        </motion.h2>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <PricingCard tier={translations.audit} />
          <PricingCard tier={translations.full} />
        </motion.div>

        <motion.p
          className="mt-10 text-center text-sm text-navy/50 font-chinese"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.note}
        </motion.p>
      </div>
    </section>
  );
}
