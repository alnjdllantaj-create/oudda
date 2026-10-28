import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale, LOCALES, type Locale } from "@/i18n/dict";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ConsentBanner from "@/components/ConsentBanner";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return {
    title: { default: `${d.siteName} — ${d.tagline}`, template: `%s — ${d.siteName}` },
    description: d.description,
    applicationName: d.siteName,
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l: Locale = locale;
  const d = getDict(l);
  return (
    <div lang={l} dir={d.dir} className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-lg focus:bg-white focus:p-3 focus:font-bold">{d.nav.skip}</a>
      <SiteHeader locale={l} d={d} />
      <main id="main" className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <SiteFooter locale={l} d={d} />
      <ConsentBanner locale={l} d={d} />
    </div>
  );
}
