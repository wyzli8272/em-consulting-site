import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import TrackRecord from "@/components/TrackRecord";
import Team from "@/components/Team";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Navigation translations={dict.nav} locale={locale} />
      <main id="main-content">
        <Hero translations={dict.hero} />
        <WhyUs translations={dict.whyUs} />
        <Process translations={dict.process} />
        <TrackRecord translations={dict.trackRecord} />
        <Team translations={dict.team} locale={locale} />
        <Pricing translations={dict.pricing} locale={locale} />
        <FAQ translations={dict.faq} />
        <Contact translations={dict.contact} />
      </main>
      <Footer translations={dict.footer} />
    </>
  );
}
