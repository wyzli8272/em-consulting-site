#!/usr/bin/env node
/**
 * i18n structural parity check.
 *
 * Walks messages/zh-CN.json and messages/en.json side-by-side and reports:
 *   - keys present in one locale but not the other
 *   - value-type mismatches (e.g. string vs array at the same path)
 *   - array length mismatches (a 6-item list on one side, 5 on the other
 *     is almost always a forgotten translation)
 *
 * Exits with code 1 if any issues are found. Wired into `prebuild` so
 * Vercel deploys cannot ship a site with mismatched i18n keys.
 *
 * Plain .mjs (no external deps, no TS toolchain) so the repo stays
 * free of a lint/test pipeline for a single utility script.
 */

import { readFile } from "node:fs/promises";

const load = (relPath) =>
  readFile(new URL(relPath, import.meta.url), "utf8").then(JSON.parse);

const [zh, en] = await Promise.all([
  load("../messages/zh-CN.json"),
  load("../messages/en.json"),
]);

/** @type {string[]} */
const errors = [];

const typeOf = (v) =>
  v === null ? "null" : Array.isArray(v) ? "array" : typeof v;

const walk = (a, b, path) => {
  const ta = typeOf(a);
  const tb = typeOf(b);
  if (ta !== tb) {
    errors.push(`${path || "<root>"}: type mismatch (zh-CN=${ta}, en=${tb})`);
    // Descend when both sides are containers of the same kind — a string-vs-
    // object mismatch at one key shouldn't hide every missing translation
    // inside a sibling subtree. The early-return pre-Round-5 bailed out
    // entirely on any type mismatch, which undersold the error budget on
    // large diffs ("fix the one type mismatch, re-run, see the next N
    // missing keys"). Descending reports everything in one pass.
    if (ta === "object" && tb === "object") {
      // Walk the intersection as objects.
    } else if (ta === "array" && tb === "array") {
      // Walk the intersection as arrays.
    } else {
      return;
    }
  }

  if (ta === "array") {
    if (a.length !== b.length) {
      errors.push(
        `${path}: array length mismatch (zh-CN=${a.length}, en=${b.length})`,
      );
      // Still walk the overlap so we report inner issues too
    }
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) walk(a[i], b[i], `${path}[${i}]`);
    return;
  }

  if (ta === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    const prefix = path ? `${path}.` : "";
    for (const k of keysA) {
      if (!(k in b)) errors.push(`${prefix}${k}: missing in messages/en.json`);
    }
    for (const k of keysB) {
      if (!(k in a)) errors.push(`${prefix}${k}: missing in messages/zh-CN.json`);
    }
    for (const k of keysA) if (k in b) walk(a[k], b[k], `${prefix}${k}`);
  }
  // Scalar (string, number, boolean, null): nothing further to check — we
  // care about structural parity, not value equality (they're translations).
};

walk(zh, en, "");

if (errors.length > 0) {
  console.error(
    `\n✗ i18n parity check failed — ${errors.length} issue${errors.length === 1 ? "" : "s"}:\n`,
  );
  for (const e of errors) console.error(`  ${e}`);
  console.error(""); // trailing blank line
  process.exit(1);
}

console.log("✓ i18n parity OK — messages/zh-CN.json and messages/en.json match");
