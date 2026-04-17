import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
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

  // hasLocale is a type predicate — `locale` is narrowed to Locale below.
  const dict = await getDictionary(locale);

  return (
    <>
      <Navigation translations={dict.nav} locale={locale} />
      <main id="main-content">
        <Hero translations={dict.hero} />
        <WhyUs translations={dict.whyUs} />
        <Process translations={dict.process} />
        <TrackRecord translations={dict.trackRecord} />
        <Team translations={dict.team} />
        <FAQ translations={dict.faq} />
        <Pricing translations={dict.pricing} />
        <Contact translations={dict.contact} />
      </main>
      <Footer translations={dict.footer} />
    </>
  );
}
