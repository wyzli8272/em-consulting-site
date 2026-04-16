"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/constants";

interface NavigationProps {
  translations: {
    whyUs: string;
    process: string;
    trackRecord: string;
    team: string;
    pricing: string;
    faq: string;
    contact: string;
    cta: string;
  };
  locale: string;
}

const sections = [
  { id: "why-us", key: "whyUs" as const },
  { id: "process", key: "process" as const },
  { id: "advisory-experience", key: "trackRecord" as const },
  { id: "team", key: "team" as const },
  { id: "pricing", key: "pricing" as const },
  { id: "faq", key: "faq" as const },
  { id: "contact", key: "contact" as const },
];

export default function Navigation({ translations, locale }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLAnchorElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      requestAnimationFrame(() => {
        setScrolled((prev) => {
          const next = window.scrollY > 50;
          return prev === next ? prev : next;
        });
        ticking.current = false;
      });
      ticking.current = true;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      // Move initial focus to first interactive element
      setTimeout(() => firstFocusRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleFocusTrap = useCallback(
    (e: React.KeyboardEvent) => {
      if (!mobileOpen || e.key !== "Tab") return;
      const first = firstFocusRef.current;
      const last = lastFocusRef.current;
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [mobileOpen]
  );

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const otherLocale = locale === "zh-CN" ? "/en" : "/";
  const toggleLabel = locale === "zh-CN" ? "EN" : "中";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "bg-ink/30 backdrop-blur-sm"
      }`}
      role="navigation"
      aria-label={locale === "zh-CN" ? "主导航" : "Main navigation"}
    >
      <div className="mx-auto max-w-[1200px] px-6 flex h-16 items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-display text-xl tracking-tight transition-colors duration-300 ${
            scrolled ? "text-navy" : "text-white"
          }`}
        >
          EM Consulting
          <span className="sr-only">
            {" — "}
            {locale === "zh-CN" ? "回到顶部" : "back to top"}
          </span>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`text-xs uppercase tracking-[0.15em] font-medium transition-opacity duration-200 hover:opacity-70 ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              {translations[s.key]}
            </button>
          ))}

          {/* Locale toggle with divider */}
          <span
            className={`h-4 w-px ${scrolled ? "bg-navy/20" : "bg-white/30"}`}
            aria-hidden="true"
          />
          <Link
            href={otherLocale}
            className={`text-xs uppercase tracking-[0.15em] font-medium transition-opacity duration-200 hover:opacity-70 ${
              scrolled ? "text-navy" : "text-white"
            }`}
            aria-label={
              locale === "zh-CN" ? "Switch to English" : "切换到中文"
            }
          >
            {toggleLabel}
          </Link>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-ink px-5 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-colors duration-200 hover:bg-gold/85"
          >
            {translations.cta}
          </a>
        </div>

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

      {/* Mobile overlay as proper dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={locale === "zh-CN" ? "菜单" : "Menu"}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        onKeyDown={handleFocusTrap}
      >
        <div className="flex flex-col items-center gap-8">
          {sections.map((s, i) => (
            <button
              key={s.id}
              ref={i === 0 ? firstFocusRef : undefined}
              onClick={() => scrollTo(s.id)}
              className="text-xs uppercase tracking-[0.2em] font-medium text-white transition-opacity duration-200 hover:opacity-70"
              tabIndex={mobileOpen ? 0 : -1}
            >
              {translations[s.key]}
            </button>
          ))}
          <Link
            href={otherLocale}
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 transition-opacity duration-200 hover:opacity-70"
            tabIndex={mobileOpen ? 0 : -1}
          >
            {toggleLabel}
          </Link>
          <a
            ref={lastFocusRef}
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-gold px-8 py-3 text-ink text-xs uppercase tracking-[0.1em] font-medium transition-colors duration-200 hover:bg-gold/85"
            tabIndex={mobileOpen ? 0 : -1}
          >
            {translations.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
