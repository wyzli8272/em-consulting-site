import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { displayFont, bodyFont, chineseFont, chineseSerifFont } from "@/lib/fonts";
import { hasLocale, getDictionary } from "@/lib/dictionaries";
import { SITE_URL } from "@/lib/constants";
import MotionConfigWrapper from "@/components/MotionConfigWrapper";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return [{ locale: "zh-CN" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  // hasLocale is a type predicate — `locale` is narrowed to Locale below.
  const dict = await getDictionary(locale);

  return {
    // Resolves relative OG/Twitter image URLs (including the ImageResponse
    // routes at /opengraph-image, /icon, /apple-icon) to absolute URLs so
    // WeChat / WhatsApp / Twitter crawlers can fetch them.
    metadataBase: new URL(SITE_URL),
    title: dict.metadata.title,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: locale === "zh-CN" ? SITE_URL : `${SITE_URL}/en`,
      siteName: "EM Consulting",
      locale: locale === "zh-CN" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    alternates: {
      canonical: locale === "zh-CN" ? "/" : "/en",
      languages: {
        "zh-CN": "/",
        en: "/en",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "EM Consulting",
    description:
      locale === "zh-CN"
        ? "沃顿·亨茨曼双学位与MIT录取背景。一位顾问全程参与美本申请的策略制定与执行。"
        : "Wharton Huntsman Dual Degree and MIT admit. Structured admissions consulting for Chinese families applying to U.S. universities.",
    url: locale === "zh-CN" ? SITE_URL : `${SITE_URL}/en`,
    serviceType: "College Admissions Consulting",
    areaServed: {
      "@type": "Country",
      name: "China",
    },
    availableLanguage: [
      { "@type": "Language", name: "Chinese" },
      { "@type": "Language", name: "English" },
    ],
  };

  // Conditional font className: only attach the CJK font variables on zh-CN.
  // Combined with `preload: false` on the CJK fonts in lib/fonts.ts, this means
  // /en visitors never download the ~75 KB Noto Sans SC + ~80 KB Noto Serif SC
  // bundles. Italiana + Public Sans alone cover all Latin glyphs on /en.
  const fontClassName =
    locale === "zh-CN"
      ? `${displayFont.variable} ${bodyFont.variable} ${chineseFont.variable} ${chineseSerifFont.variable}`
      : `${displayFont.variable} ${bodyFont.variable}`;

  return (
    <html
      lang={locale === "zh-CN" ? "zh-CN" : "en"}
      dir="ltr"
      className={fontClassName}
    >
      <body className="font-body bg-cream text-navy antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink focus:text-sm focus:font-medium"
        >
          {locale === "zh-CN" ? "跳至主要内容" : "Skip to main content"}
        </a>
        <MotionConfigWrapper>{children}</MotionConfigWrapper>
        <Script
          id="jsonld-professional-service"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CGMPR92FK7"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CGMPR92FK7');`}
        </Script>
      </body>
    </html>
  );
}
