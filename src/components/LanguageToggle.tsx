"use client";

import Link from "next/link";

interface LanguageToggleProps {
  locale: string;
  className?: string;
}

export default function LanguageToggle({
  locale,
  className = "",
}: LanguageToggleProps) {
  const otherLocale = locale === "zh-CN" ? "/en" : "/";
  const label = locale === "zh-CN" ? "EN" : "中";
  const ariaLabel = locale === "zh-CN" ? "Switch to English" : "切换到中文";

  return (
    <Link href={otherLocale} className={className} aria-label={ariaLabel}>
      {label}
    </Link>
  );
}
