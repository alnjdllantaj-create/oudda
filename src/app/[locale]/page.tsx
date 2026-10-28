import type { Metadata } from "next";
import Link from "next/link";
import { getDict, LOCALES } from "@/i18n/dict";
import { href } from "@/i18n/routes";
import { TOOLS, TOOL_SLUGS } from "@/content/tools";
import { GUIDES } from "@/content/guides";
import { TEMPLATES, TEMPLATE_SLUGS } from "@/content/templates";
import { buildMetadata, getSiteUrl, faqJsonLd } from "@/lib/seo";
import { readLocale } from "@/lib/page";
import { ToolCard, GuideCard, TemplateCard } from "@/components/Cards";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icons";

export function generateStaticParams() { return LOCALES.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await readLocale(params);
  const d = getDict(locale);
  return buildMetadata({ locale, title: `${d.siteName} — ${d.tagline}`, description: d.description, path: "" });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const d = getDict(locale);
  const base = getSiteUrl();
  const tools = TOOL_SLUGS.map((s) => TOOLS[locale][s]);
  const guides = GUIDES[locale].slice(0, 6);
  const templates = TEMPLATE_SLUGS.slice(0, 4).map((s) => TEMPLATES[locale][s]);
  const webSiteLd = {
    "@context": "https://schema.org", "@type": "WebSite",
    name: d.siteName, alternateName: d.siteNameLatin,
    inLanguage: locale === "ar" ? "ar" : "fr",
    ...(base ? { url: `${base}${href(locale)}` } : {}),
    publisher: { "@type": "Organization", name: `${d.siteName} | ${d.siteNameLatin}` },
  };
  return (
    <>
      <JsonLd data={webSiteLd} />
      <JsonLd data={faqJsonLd(d.home.faq)} />
      <section className="card overflow-hidden">
        <div className="bg-gradient-to-b from-brand-50 to-white px-6 py-12 text-center sm:px-12 sm:py-16">
          <span className="chip">{d.home.badge}</span>
          <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight text-brand-800 sm:text-4xl">{d.home.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-ink-700">{d.home.lead}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={href(locale, "tools")} className="btn btn-primary">{d.home.ctaTools}</Link>
            <Link href={href(locale, "guides")} className="btn btn-secondary">{d.home.ctaGuides}</Link>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold text-ink-600">
            {[d.home.trust1, d.home.trust2, d.home.trust3].map((x) => <li key={x} className="flex items-center gap-1"><Icon name="check" className="h-4 w-4 text-brand-600" />{x}</li>)}
          </ul>
        </div>
      </section>
      <AdSlot d={d} slot="home-top" />

      <section className="mt-14" aria-labelledby="tools-h">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div><h2 id="tools-h" className="text-2xl font-black text-brand-800">{d.home.toolsTitle}</h2><p className="mt-2 text-ink-600">{d.home.toolsLead}</p></div>
          <Link href={href(locale, "tools")} className="text-sm font-bold text-brand-700 underline">{d.home.allTools} ←</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => <ToolCard key={t.slug} locale={locale} d={d} item={t} />)}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="guides-h">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div><h2 id="guides-h" className="text-2xl font-black text-brand-800">{d.home.guidesTitle}</h2><p className="mt-2 text-ink-600">{d.home.guidesLead}</p></div>
          <Link href={href(locale, "guides")} className="text-sm font-bold text-brand-700 underline">{d.home.allGuides} ←</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => <GuideCard key={g.slug} locale={locale} item={g} />)}
        </div>
      </section>

      <AdSlot d={d} slot="home-mid" />

      <section className="mt-16" aria-labelledby="templates-h">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div><h2 id="templates-h" className="text-2xl font-black text-brand-800">{d.home.templatesTitle}</h2><p className="mt-2 text-ink-600">{d.home.templatesLead}</p></div>
          <Link href={href(locale, "templates")} className="text-sm font-bold text-brand-700 underline">{d.home.allTemplates} ←</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((t) => <TemplateCard key={t.slug} locale={locale} d={d} item={t} />)}
        </div>
      </section>

      <Faq d={d} title={d.home.faqTitle} items={d.home.faq} />
    </>
  );
}
