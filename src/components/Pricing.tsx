"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  EASE_OUT as ease,
  DEFAULT_VIEWPORT,
  NEAR_VIEWPORT,
} from "@/lib/motion";

interface PricingTier {
  name: string;
  nameEn: string;
  price: string;
  priceAlt: string;
  description: string;
  // Optional exclusions clause, currently set on Full Package only.
  // Rendered as a subordinate paragraph beneath `description` so the
  // "what's NOT included" boundary reads as deliberate guardrail, not
  // fine-print disclaimer. Aligns with Service Agreement §1.6 so HNW
  // parents don't assume SAT/ACT/TOEFL prep comes bundled.
  exclusions?: string;
}

interface PricingProps {
  translations: {
    sectionTag: string;
    title: string;
    note: string;
    audit: PricingTier;
    full: PricingTier;
    // Single-line payment-methods + currency-governance note rendered
    // below both cards. Maps to Service Agreement §4.3 (USD governs,
    // RMB is reference) so the /zh-CN ¥ display doesn't imply RMB is
    // the contractual denomination.
    paymentNote: string;
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
          viewport={DEFAULT_VIEWPORT}
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
            viewport={NEAR_VIEWPORT}
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
            {/* Exclusions — deliberate boundary, not fine-print. Sits under
                the main description with a hairline divider so it reads
                as a second paragraph of equal weight, visually quieter via
                reduced opacity and smaller text. Aligns with Service
                Agreement §1.6. The divider (border-t border-white/10) is
                the one place this card uses a horizontal rule; kept
                extra-thin and low-contrast so it separates thoughts
                without adding visual noise. */}
            {translations.full.exclusions && (
              <p className="mt-5 max-w-[520px] border-t border-white/10 pt-5 text-sm text-white/60 font-chinese">
                {translations.full.exclusions}
              </p>
            )}
          </m.article>

          {/* Audit — secondary cream card (not pure white, aligns with surface token) */}
          <m.article
            className="border border-navy/15 bg-cream p-8 md:p-10"
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={NEAR_VIEWPORT}
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

          {/* Payment methods + currency-governance note. Lives in the
              cards column (md:col-span-8) so it aligns with the cards
              rather than the left-rail note. Small and muted so it
              reads as a contract-adjacent disclosure, not a sales
              pitch. Service Agreement §4.3 says USD governs; this
              line tells parents the ¥ display is reference only —
              prevents any later "but the website said ¥" surprise. */}
          <m.p
            className="pt-2 max-w-[520px] text-sm text-navy/60 font-chinese"
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={NEAR_VIEWPORT}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            {translations.paymentNote}
          </m.p>
        </div>
      </div>
    </section>
  );
}
