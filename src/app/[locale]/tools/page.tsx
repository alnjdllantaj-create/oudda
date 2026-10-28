import type { Metadata } from "next";
import { getDict, LOCALES } from "@/i18n/dict";
import { TOOLS, TOOL_SLUGS } from "@/content/tools";
import { buildMetadata } from "@/lib/seo";
import { readLocale } from "@/lib/page";
import { ToolCard } from "@/components/Cards";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";

export function generateStaticParams() { return LOCALES.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await readLocale(params); const d = getDict(locale);
  return buildMetadata({ locale, title: d.tools.indexTitle, description: d.tools.lead, path: "tools" });
}

export default async function ToolsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params); const d = getDict(locale);
  return (
    <>
      <Breadcrumbs locale={locale} d={d} items={[{ name: d.nav.tools }]} />
      <h1 className="text-3xl font-black text-brand-800">{d.tools.indexTitle}</h1>
      <p className="mt-3 max-w-2xl text-ink-700">{d.tools.lead}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOL_SLUGS.map((s) => <ToolCard key={s} locale={locale} d={d} item={TOOLS[locale][s]} />)}
      </div>
      <AdSlot d={d} slot="tools-index" />
      <Faq d={d} title={d.guides.faqTitle} items={d.home.faq} />
    </>
  );
}
