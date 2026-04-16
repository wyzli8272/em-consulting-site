import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { displayFont, bodyFont, chineseFont } from "@/lib/fonts";
import { hasLocale, getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";
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

  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
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
        ? "沃顿·亨茨曼双学位与MIT录取背景。从定位到提交，为中国家庭提供结构化的美本申请策略服务。"
        : "Wharton Huntsman Dual Degree and MIT admit. Structured admissions consulting for Chinese families targeting U.S. top universities.",
    url: "https://emconsulting.co",
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

  return (
    <html
      lang={locale === "zh-CN" ? "zh-CN" : "en"}
      className={`${displayFont.variable} ${bodyFont.variable} ${chineseFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-cream text-navy antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink focus:text-sm focus:font-medium"
        >
          {locale === "zh-CN" ? "跳至主要内容" : "Skip to main content"}
        </a>
        {children}
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
