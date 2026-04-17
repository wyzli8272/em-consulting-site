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
  const firstFocusRef = useRef<HTMLAnchorElement>(null);
  const lastFocusRef = useRef<HTMLAnchorElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      // Set the flag BEFORE scheduling the frame so concurrent scroll events
      // don't queue multiple RAFs between "check flag" and "set flag."
      ticking.current = true;
      rafId.current = requestAnimationFrame(() => {
        setScrolled((prev) => {
          const next = window.scrollY > 50;
          return prev === next ? prev : next;
        });
        ticking.current = false;
        rafId.current = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      // Move initial focus to first interactive element. Tracked so the
      // cleanup can cancel the scheduled focus if the dialog closes before
      // the timeout fires (prevents a stale focus call on an unmounted ref).
      const id = window.setTimeout(() => firstFocusRef.current?.focus(), 50);
      return () => {
        document.body.style.overflow = "";
        window.clearTimeout(id);
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        // Restore focus to the hamburger trigger so screen-reader users
        // aren't dropped on <body> after dismissing the dialog.
        triggerRef.current?.focus();
      }
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

  /**
   * Smooth-scroll to a section anchor on plain left-click, otherwise let the
   * browser handle the link (middle-click, cmd-click, right-click etc.). The
   * `scrollIntoView` behavior is forced to `auto` when the user has
   * prefers-reduced-motion set — meeting WCAG 2.3.3 without suppressing all
   * scroll behavior for everyone.
   */
  const scrollTo = useCallback(
    (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(id)?.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
      });
      history.replaceState(null, "", `#${id}`);
      setMobileOpen(false);
    },
    []
  );

  const otherLocale = locale === "zh-CN" ? "/en" : "/";
  const toggleLabel = locale === "zh-CN" ? "EN" : "中";
  const switchLabel =
    locale === "zh-CN" ? "Switch to English" : "切换到中文";
  const ctaNewTabLabel =
    locale === "zh-CN" ? "（在新窗口打开）" : "(opens in new tab)";

  // Preserve the current section anchor when switching locales so the reader
  // doesn't lose their place. Runs only on plain left-click; middle/cmd/shift
  // fall through to the default /en or / URL.
  const handleLocaleSwitch = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash) return;
      e.preventDefault();
      window.location.assign(`${otherLocale}${hash}`);
    },
    [otherLocale]
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-cream/95 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "bg-ink/65"
      }`}
      aria-label={locale === "zh-CN" ? "主导航" : "Main navigation"}
    >
      <div className="mx-auto max-w-[1200px] px-6 flex h-16 items-center justify-between">
        {/* Anchor (not button) so middle-click / cmd-click / right-click behave
            correctly and the link semantics are preserved for keyboard users.
            preventDefault only on plain left-click to keep smooth scroll. */}
        <a
          href="#top"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            const prefersReduced =
              typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({
              top: 0,
              behavior: prefersReduced ? "auto" : "smooth",
            });
            history.replaceState(null, "", window.location.pathname);
          }}
          className={`font-display text-xl tracking-tight transition-colors duration-300 ${
            scrolled ? "text-navy" : "text-white"
          }`}
        >
          EM Consulting
          <span className="sr-only">
            {" — "}
            {locale === "zh-CN" ? "回到顶部" : "back to top"}
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => scrollTo(s.id, e)}
              className={`text-xs uppercase tracking-[0.15em] font-medium transition-opacity duration-200 hover:opacity-70 ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              {translations[s.key]}
            </a>
          ))}

          {/* Locale toggle with divider so it's visually distinct from the
              section anchors — a small but important affordance. */}
          <span
            className={`h-4 w-px ${scrolled ? "bg-navy/20" : "bg-white/30"}`}
            aria-hidden="true"
          />
          <Link
            href={otherLocale}
            scroll={false}
            onClick={handleLocaleSwitch}
            className={`text-xs uppercase tracking-[0.15em] font-medium transition-opacity duration-200 hover:opacity-70 ${
              scrolled ? "text-navy" : "text-white"
            }`}
            aria-label={switchLabel}
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
            <span className="sr-only"> {ctaNewTabLabel}</span>
          </a>
        </div>

        <button
          ref={triggerRef}
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
          aria-controls="mobile-menu-panel"
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

      {/* Mobile overlay as proper dialog. The onKeyDown trap is required on
          the dialog container itself to scope Tab/Shift+Tab/Escape behavior;
          `role="dialog"` upgrades semantics but jsx-a11y doesn't treat it as
          an interactive role, hence the targeted disable. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        id="mobile-menu-panel"
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
            <a
              key={s.id}
              ref={i === 0 ? firstFocusRef : undefined}
              href={`#${s.id}`}
              onClick={(e) => scrollTo(s.id, e)}
              className="text-xs uppercase tracking-[0.2em] font-medium text-white transition-opacity duration-200 hover:opacity-70"
              tabIndex={mobileOpen ? 0 : -1}
            >
              {translations[s.key]}
            </a>
          ))}
          <Link
            href={otherLocale}
            scroll={false}
            onClick={handleLocaleSwitch}
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 transition-opacity duration-200 hover:opacity-70"
            tabIndex={mobileOpen ? 0 : -1}
            aria-label={switchLabel}
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
            <span className="sr-only"> {ctaNewTabLabel}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
