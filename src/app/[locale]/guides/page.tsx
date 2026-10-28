import type { Metadata } from "next";
import { getDict, LOCALES } from "@/i18n/dict";
import { GUIDES } from "@/content/guides";
import { buildMetadata } from "@/lib/seo";
import { readLocale } from "@/lib/page";
import { GuideCard } from "@/components/Cards";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() { return LOCALES.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await readLocale(params); const d = getDict(locale);
  return buildMetadata({ locale, title: d.guides.indexTitle, description: d.guides.lead, path: "guides" });
}

export default async function GuidesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params); const d = getDict(locale);
  const cats = [...new Set(GUIDES[locale].map((g) => g.category))];
  return (
    <>
      <Breadcrumbs locale={locale} d={d} items={[{ name: d.nav.guides }]} />
      <h1 className="text-3xl font-black text-brand-800">{d.guides.indexTitle}</h1>
      <p className="mt-3 max-w-2xl text-ink-700">{d.guides.lead}</p>
      <div className="mt-5 flex flex-wrap gap-2">{cats.map((c) => <span key={c} className="chip">{c}</span>)}</div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES[locale].map((g) => <GuideCard key={g.slug} locale={locale} item={g} />)}
      </div>
      <AdSlot d={d} slot="guides-index" />
    </>
  );
}
