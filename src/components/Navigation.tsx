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

// Order must match the render order of sections in app/[locale]/page.tsx:
// Hero → WhyUs → Process → TrackRecord → Team → FAQ → Pricing → Contact.
// Round 4 deliberately placed FAQ before Pricing (objections resolve before
// price reveal), but the nav array kept the old Pricing-before-FAQ order,
// so clicking "Pricing" scrolled past FAQ and clicking "FAQ" bounced back
// up. Keep this array synchronized with page.tsx render order.
const sections = [
  { id: "why-us", key: "whyUs" as const },
  { id: "process", key: "process" as const },
  { id: "advisory-experience", key: "trackRecord" as const },
  { id: "team", key: "team" as const },
  { id: "faq", key: "faq" as const },
  { id: "pricing", key: "pricing" as const },
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

  // Preserve the reader's place when switching locales. Two strategies,
  // both only firing on plain left-click (middle/cmd/shift/right fall
  // through to the default /en or / URL so new-tab / new-window open at
  // the top of the other locale, which is usually what users expect for
  // those gestures):
  //
  //   1. If the URL carries a section hash (#pricing, #faq, etc.), hand
  //      it to the other locale so the reader lands on the same section.
  //   2. Otherwise, stash `window.scrollY` in sessionStorage before the
  //      navigation and restore it on mount of the destination locale
  //      (see the scroll-restore effect below). Covers the case where
  //      a parent is reading mid-page with no anchor — without this,
  //      Next.js default resets scroll to 0 on the new locale.
  const handleLocaleSwitch = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash) {
        e.preventDefault();
        window.location.assign(`${otherLocale}${hash}`);
        return;
      }
      // No hash: record the scroll position and let <Link> handle the nav.
      // We still block-and-assign to force a full navigation — Next's
      // client-side soft navigation preserves state the route resolver
      // doesn't want preserved. sessionStorage survives the browser-level
      // document swap.
      try {
        window.sessionStorage.setItem("em-scroll", String(window.scrollY));
      } catch {
        // Private mode / cookie-blocked — fall through without preserving.
      }
    },
    [otherLocale]
  );

  // Restore scroll position after a locale-toggle navigation. Fires once
  // on mount; clears the key so that an intentional return to top (e.g.
  // clicking the brand wordmark) isn't second-guessed on the next nav.
  //
  // Round 6 code review caught a race: the original single-RAF attempt
  // fired before the hero image decoded, so deep-scrolled restorations
  // landed 100-400px off-target. Two-stage strategy:
  //   1. Try immediately on mount (cheap — if layout is already there,
  //      this works in the first paint and the user sees no jump).
  //   2. If the target y exceeds the current document height (typical
  //      on cold load because the hero image hasn't decoded yet), wait
  //      for `window.load` — which fires only after all resources
  //      (images, fonts) have finished loading — then retry.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let saved: string | null = null;
    try {
      saved = window.sessionStorage.getItem("em-scroll");
      if (saved === null) return;
      window.sessionStorage.removeItem("em-scroll");
    } catch {
      return;
    }
    const y = Number(saved);
    if (!Number.isFinite(y) || y <= 0) return;

    const attempt = () => window.scrollTo({ top: y, behavior: "auto" });

    // First attempt — defer one RAF so synchronous layout completes.
    const rafId = requestAnimationFrame(() => {
      attempt();
      // If we couldn't reach the target because content hasn't painted
      // yet, wait for the full `load` event and retry once.
      if (Math.ceil(window.scrollY) < y - 4) {
        if (document.readyState === "complete") {
          // Already loaded — our scroll just got clamped by layout.
          // Nothing more we can do without introducing fragility.
          return;
        }
        const onLoad = () => attempt();
        window.addEventListener("load", onLoad, { once: true });
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? // Hairline boundary instead of drop shadow — editorial
            // publications use a rule, not a cast shadow, to separate
            // the masthead from the page. Round 6 bumped 0.08 → 0.12
            // because at 375px the 8% navy rule was disappearing
            // entirely on cream; 12% still reads as editorial-quiet
            // without competing with the page's accent rules.
            "bg-cream/95 border-b border-navy/[0.12]"
          : // Pre-scroll scrim over the hero photo. 80% ink so
            // `text-white/80` nav links clear 4.5:1 even over the
            // lightest areas of the campus photo.
            "bg-ink/80"
      }`}
      aria-label={locale === "zh-CN" ? "主导航" : "Main navigation"}
    >
      <div className="mx-auto max-w-[1200px] px-6 flex h-16 items-center justify-between">
        {/* Brand wordmark is a Link to the locale root, not an in-document
            anchor. On plain left-click we still smooth-scroll (no navigation)
            so the scroll-to-top affordance is preserved; but middle-click /
            cmd-click / right-click → open-in-new-tab now land at the real
            locale root URL, which is semantically what the wordmark means.
            Pre-Round-6 the href was `#top` with no matching `id="top"` in
            the document, so AT users navigating by landmark/anchor hit a
            broken in-document reference. */}
        <Link
          href={otherLocale === "/en" ? "/" : "/en"}
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
          aria-label={`EM Consulting, ${locale === "zh-CN" ? "回到顶部" : "back to top"}`}
        >
          EM Consulting
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            // Hover uses color transition, not opacity. `hover:opacity-70`
            // mutes the entire element including text stroke, which makes
            // the hairline Italiana wordmark (and the tight letter-spacing
            // of the section labels) look momentarily broken. Color-based
            // hover preserves glyph weight.
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => scrollTo(s.id, e)}
              className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-navy hover:text-navy/60"
                  : "text-white hover:text-white/70"
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
          {/* The visible text ("EN" / "中") is in a different language than
              the surrounding nav content, so `lang` is set on the anchor so
              VoiceOver / NVDA voice it correctly (WCAG 3.1.2). */}
          <Link
            href={otherLocale}
            scroll={false}
            onClick={handleLocaleSwitch}
            lang={locale === "zh-CN" ? "en" : "zh-CN"}
            className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-200 ${
              scrolled
                ? "text-navy hover:text-navy/60"
                : "text-white hover:text-white/70"
            }`}
            aria-label={switchLabel}
          >
            {toggleLabel}
          </Link>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-ink px-5 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-colors duration-200 hover:bg-gold-hover"
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
          an interactive role, hence the targeted disable.

          `inert` is the modern replacement for aria-hidden + tabIndex=-1 on
          focusable descendants. When `inert` is present on a container, the
          entire subtree is removed from the accessibility tree AND from the
          tab order, atomically — so assistive tech can't accidentally reach
          an off-screen link that aria-hidden alone doesn't fully exclude.
          Baseline-supported across all modern browsers. */}
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
        inert={!mobileOpen}
        onKeyDown={handleFocusTrap}
      >
        <div className="flex flex-col items-center gap-8">
          {sections.map((s, i) => (
            <a
              key={s.id}
              ref={i === 0 ? firstFocusRef : undefined}
              href={`#${s.id}`}
              onClick={(e) => scrollTo(s.id, e)}
              className="text-xs uppercase tracking-[0.2em] font-medium text-white transition-colors duration-200 hover:text-white/70"
            >
              {translations[s.key]}
            </a>
          ))}
          <Link
            href={otherLocale}
            scroll={false}
            onClick={handleLocaleSwitch}
            lang={locale === "zh-CN" ? "en" : "zh-CN"}
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 transition-colors duration-200 hover:text-white"
            aria-label={switchLabel}
          >
            {toggleLabel}
          </Link>
          <a
            ref={lastFocusRef}
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-gold px-8 py-3 text-ink text-xs uppercase tracking-[0.1em] font-medium transition-colors duration-200 hover:bg-gold-hover"
          >
            {translations.cta}
            <span className="sr-only"> {ctaNewTabLabel}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
