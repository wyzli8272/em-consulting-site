"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Wraps the app in two contracts:
 *
 *  1. LazyMotion(domAnimation) — trees out ~30 KB of Framer features the site
 *     doesn't use (drag, layout, reorder, etc.). Every child must use the
 *     `m.*` (not `motion.*`) primitive — enforced by `strict`.
 *
 *  2. MotionConfig(reducedMotion: "user") — honors the OS-level
 *     `prefers-reduced-motion` setting. The CSS-only override in globals.css
 *     zeroes CSS transitions; Framer tween animations need this runtime
 *     config to actually collapse. Required for WCAG 2.3.3.
 */
export default function MotionConfigWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
