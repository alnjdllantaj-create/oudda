import type { Metadata } from "next";
import { getDict, LOCALES } from "@/i18n/dict";
import { TEMPLATES, TEMPLATE_SLUGS } from "@/content/templates";
import { buildMetadata } from "@/lib/seo";
import { readLocale } from "@/lib/page";
import { TemplateCard } from "@/components/Cards";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() { return LOCALES.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await readLocale(params); const d = getDict(locale);
  return buildMetadata({ locale, title: d.templates.indexTitle, description: d.templates.lead, path: "templates" });
}

export default async function TemplatesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params); const d = getDict(locale);
  return (
    <>
      <Breadcrumbs locale={locale} d={d} items={[{ name: d.nav.templates }]} />
      <h1 className="text-3xl font-black text-brand-800">{d.templates.indexTitle}</h1>
      <p className="mt-3 max-w-2xl text-ink-700">{d.templates.lead}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATE_SLUGS.map((s) => <TemplateCard key={s} locale={locale} d={d} item={TEMPLATES[locale][s]} />)}
      </div>
      <AdSlot d={d} slot="templates-index" />
    </>
  );
}
