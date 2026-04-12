import "server-only";

const dictionaries = {
  "zh-CN": () =>
    import("../../messages/zh-CN.json").then((m) => m.default),
  en: () => import("../../messages/en.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["zh-CN", "en"];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
