"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface NavigationProps {
  translations: {
    whyUs: string;
    process: string;
    team: string;
    pricing: string;
    contact: string;
    cta: string;
  };
  locale: string;
}

const sections = [
  { id: "why-us", key: "whyUs" as const },
  { id: "process", key: "process" as const },
  { id: "team", key: "team" as const },
  { id: "pricing", key: "pricing" as const },
  { id: "contact", key: "contact" as const },
];

export default function Navigation({ translations, locale }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const otherLocale = locale === "zh-CN" ? "/en" : "/";
  const toggleLabel = locale === "zh-CN" ? "EN" : "中";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-cream shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label={locale === "zh-CN" ? "主导航" : "Main navigation"}
    >
      <div className="mx-auto max-w-[1200px] px-6 flex h-16 items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-display text-xl tracking-tight transition-colors duration-300 ${
            scrolled ? "text-navy" : "text-white"
          }`}
          aria-label={locale === "zh-CN" ? "回到顶部" : "Back to top"}
        >
          EM Consulting
        </button>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`text-sm transition-opacity duration-200 hover:opacity-70 ${
                scrolled ? "text-navy" : "text-white/90"
              }`}
            >
              {translations[s.key]}
            </button>
          ))}
          <Link
            href={otherLocale}
            className={`text-sm transition-opacity duration-200 hover:opacity-70 ${
              scrolled ? "text-navy" : "text-white/90"
            }`}
            aria-label={
              locale === "zh-CN" ? "Switch to English" : "切换到中文"
            }
          >
            {toggleLabel}
          </Link>
          <a
            href="https://calendly.com/lishaorui82/em-consulting-diagnostic-session"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-ink px-5 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gold/85"
          >
            {translations.cta}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-[60] flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={
            mobileOpen
              ? locale === "zh-CN"
                ? "关闭菜单"
                : "Close menu"
              : locale === "zh-CN"
                ? "打开菜单"
                : "Open menu"
          }
          aria-expanded={mobileOpen}
        >
          <div className="flex w-6 flex-col gap-1.5">
            <span
              className={`block h-px transition-all duration-300 ${
                mobileOpen
                  ? "translate-y-[3.5px] rotate-45 bg-white"
                  : scrolled
                    ? "bg-navy"
                    : "bg-white"
              }`}
            />
            <span
              className={`block h-px transition-all duration-300 ${
                mobileOpen
                  ? "-translate-y-[3.5px] -rotate-45 bg-white"
                  : scrolled
                    ? "bg-navy"
                    : "bg-white"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col items-center gap-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="font-display text-2xl text-white transition-opacity duration-200 hover:opacity-70"
              tabIndex={mobileOpen ? 0 : -1}
            >
              {translations[s.key]}
            </button>
          ))}
          <Link
            href={otherLocale}
            className="text-lg text-white/70 transition-opacity duration-200 hover:opacity-70"
            tabIndex={mobileOpen ? 0 : -1}
          >
            {toggleLabel}
          </Link>
          <a
            href="https://calendly.com/lishaorui82/em-consulting-diagnostic-session"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-gold px-8 py-3 text-ink font-medium transition-colors duration-200 hover:bg-gold/85"
            tabIndex={mobileOpen ? 0 : -1}
          >
            {translations.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
