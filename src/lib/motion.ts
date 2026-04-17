/**
 * Shared motion constants.
 *
 * Until this module existed, `const ease = [0.16, 1, 0.3, 1] as const` was
 * duplicated in eight components. Import from here to keep the feel aligned
 * across the site and to make site-wide easing changes a one-file edit.
 */

/** ease-out-quart — calm deceleration, the house easing for reveal motion. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Shared `whileInView` viewport. Section-level reveals fire when 80px in view, once. */
export const DEFAULT_VIEWPORT = { once: true, margin: "-80px" } as const;

/** Tighter variant for elements that should reveal earlier (list items, cards). */
export const NEAR_VIEWPORT = { once: true, margin: "-60px" } as const;

/** Tightest — for micro-elements inside already-revealed blocks. */
export const INSIDE_VIEWPORT = { once: true, margin: "-40px" } as const;
