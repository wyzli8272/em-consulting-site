import "server-only";

// Type-only import — `zhCN` is only referenced as a value in `typeof`, so this
// is elided at compile time and the JSON is never bundled from this import.
import type zhCN from "../../messages/zh-CN.json";

const dictionaries = {
  "zh-CN": () =>
    import("../../messages/zh-CN.json").then((m) => m.default),
  en: () => import("../../messages/en.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

/** Canonical dictionary shape, derived from zh-CN (the default locale and
 *  the source of truth for available keys). Both locale files must match
 *  this shape; `scripts/check-i18n.ts` enforces it at build time. */
export type Dictionary = typeof zhCN;

export const locales: Locale[] = ["zh-CN", "en"];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
