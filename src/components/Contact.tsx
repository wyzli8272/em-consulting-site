"use client";

import { motion } from "framer-motion";

interface ContactProps {
  translations: {
    title: string;
    cta: string;
    ctaDescription: string;
    wechat: string;
    wechatDescription: string;
    email: string;
    emailAddress: string;
  };
}

export default function Contact({ translations }: ContactProps) {
  return (
    <section
      id="contact"
      className="bg-ink px-6 py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.h2
          id="contact-heading"
          className="font-display text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {translations.title}
        </motion.h2>

        <motion.div
          className="mt-16 grid gap-12 md:grid-cols-3 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* CTA */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              {translations.cta}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/60 font-chinese">
              {translations.ctaDescription}
            </p>
            <a
              href="https://calendly.com/lishaorui82/em-consulting-diagnostic-session"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-gold px-8 py-3 text-base font-medium text-ink transition-colors duration-200 hover:bg-gold/85"
              aria-label={translations.cta}
            >
              {translations.cta}
            </a>
          </div>

          {/* WeChat QR */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              {translations.wechat}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/60 font-chinese">
              {translations.wechatDescription}
            </p>
            {/* TODO: Replace with actual WeChat QR code image */}
            <div
              className="mt-6 flex h-40 w-40 items-center justify-center border border-white/20 text-sm text-white/30"
              role="img"
              aria-label={translations.wechatDescription}
            >
              QR Code
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              {translations.email}
            </h3>
            <a
              href={`mailto:${translations.emailAddress}`}
              className="mt-3 inline-block text-base text-gold transition-opacity duration-200 hover:opacity-70"
            >
              {translations.emailAddress}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
