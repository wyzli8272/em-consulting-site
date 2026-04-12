import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { displayFont, bodyFont, chineseFont } from "@/lib/fonts";
import { hasLocale, getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";
import "../globals.css";

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
        ? "为高净值中国家庭提供结构化美本申请策略服务"
        : "Structured admissions consulting for Chinese families targeting U.S. Top-20 universities",
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
        {/* TODO: Add Google Analytics tracking code */}
        {/* TODO: Add Baidu Tongji tracking code */}
        {/* TODO: Add Baidu site verification meta tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-cream text-navy antialiased">
        {children}
      </body>
    </html>
  );
}
