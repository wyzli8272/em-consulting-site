"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE_OUT as ease } from "@/lib/motion";

interface PricingTier {
  name: string;
  nameEn: string;
  price: string;
  priceAlt: string;
  description: string;
}

interface PricingProps {
  translations: {
    sectionTag: string;
    title: string;
    note: string;
    audit: PricingTier;
    full: PricingTier;
  };
}

export default function Pricing({ translations }: PricingProps) {
  const shouldReduce = useReducedMotion();
  return (
    <section
      id="pricing"
      className="section-standard px-6"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-[1200px] md:grid md:grid-cols-12 md:gap-12">
        {/* Left rail — breaks the repeating "tag + rule + title stacked" opener pattern */}
        <m.div
          className="md:col-span-4 md:sticky md:top-28 md:self-start"
          initial={shouldReduce ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-tag text-navy/70">
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
        </m.div>

        {/* Right cards */}
        <div className="mt-12 md:col-span-8 md:mt-0 space-y-6">
          {/* Full Package — dominant navy card with generous padding (p-10 md:p-14)
              so the price feels substantial, not squeezed. */}
          <m.article
            className="relative bg-navy p-10 md:p-14"
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Full Package title sits between Audit's `text-subtitle`
                (~24-34px) and the price's `text-headline` (~40-80px) so
                the title-then-price hierarchy reads: tier name < price.
                Round 5 bumped this to `text-title` (~30-56px) which ended
                up matching the price's effective weight at desktop clamps,
                flattening the hierarchy. A fixed mid-tier keeps the
                anchor-tier dominance over Audit without overpowering
                the price numeral — which is the real headline here. */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[1.75rem] md:text-[2.25rem] leading-tight font-display text-white">
                {translations.full.name}
              </h3>
              <span className="text-sm text-white/60" lang="en">
                {translations.full.nameEn}
              </span>
            </div>
            <div className="mt-5">
              <span className="font-display text-headline text-white">
                {translations.full.price}
              </span>
            </div>
            {/* Alt-currency reference line: 80% opacity, base size so it reads
                as a real reference number, not a whispered aside. On zh-CN
                this is USD; on /en this is RMB — the JSON keys now reflect
                that (priceAlt, not priceRmb) since Cultural #C2 flipped the
                currency order on the default locale so ¥ leads there. */}
            <p className="mt-2 text-base text-white/80">
              {translations.full.priceAlt}
            </p>
            <p className="mt-5 max-w-[520px] text-body-lg text-white/80 font-chinese">
              {translations.full.description}
            </p>
          </m.article>

          {/* Audit — secondary cream card (not pure white, aligns with surface token) */}
          <m.article
            className="border border-navy/15 bg-cream p-8 md:p-10"
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-subtitle font-display text-navy">
                {translations.audit.name}
              </h3>
              <span className="text-sm text-navy/70" lang="en">
                {translations.audit.nameEn}
              </span>
            </div>
            <div className="mt-5">
              <span className="font-display text-headline text-navy">
                {translations.audit.price}
              </span>
            </div>
            <p className="mt-2 text-base text-navy/80">
              {translations.audit.priceAlt}
            </p>
            <p className="mt-5 max-w-[520px] text-body-lg text-navy/75 font-chinese">
              {translations.audit.description}
            </p>
          </m.article>
        </div>
      </div>
    </section>
  );
}
