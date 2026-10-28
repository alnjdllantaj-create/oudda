import type { Metadata } from "next";
import Link from "next/link";
import { getDict, LOCALES } from "@/i18n/dict";
import { href } from "@/i18n/routes";
import { GUIDES, GUIDE_SLUGS, getGuide } from "@/content/guides";
import { TOOLS, TOOL_SLUGS } from "@/content/tools";
import { countText } from "@/lib/text";
import { buildMetadata, articleJsonLd, absoluteUrl } from "@/lib/seo";
import { readSlug } from "@/lib/page";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleBody from "@/components/ArticleBody";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { ToolCard, GuideCard } from "@/components/Cards";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => GUIDE_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await readSlug(params, GUIDE_SLUGS);
  const g = getGuide(locale, slug)!;
  return buildMetadata({ locale, title: g.title, description: g.description, path: `guides/${slug}` });
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await readSlug(params, GUIDE_SLUGS);
  const d = getDict(locale);
  const g = getGuide(locale, slug)!;
  const words = countText([...g.intro, ...g.sections.flatMap((s) => [...s.p, ...(s.ul ?? [])])].join(" ")).words;
  const minutes = Math.max(1, Math.ceil(words / 200));
  const related = GUIDES[locale].filter((x) => x.slug !== slug).slice(0, 3);
  const tools = g.relatedTools.filter((s) => (TOOL_SLUGS as readonly string[]).includes(s)).slice(0, 3).map((s) => TOOLS[locale][s as (typeof TOOL_SLUGS)[number]]);
  return (
    <>
      <JsonLd data={articleJsonLd({ title: g.title, description: g.description, url: absoluteUrl(locale, `guides/${slug}`), locale })} />
      <Breadcrumbs locale={locale} d={d} items={[{ name: d.nav.guides, path: "guides" }, { name: g.title }]} />
      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <span className="chip">{g.category}</span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-brand-800">{g.title}</h1>
          <p className="mt-4 text-lg leading-8 text-ink-600">{g.description}</p>
          <p className="mt-3 text-xs text-ink-600">{d.guides.readingTime}: {minutes} · {d.guides.updated}: 2026-10-27</p>
          <div className="mt-8"><ArticleBody intro={g.intro} sections={g.sections} /></div>
          <AdSlot d={d} slot={`guide-${slug}`} />
          <Faq d={d} title={g.faq.length ? d.guides.faqTitle : d.home.faqTitle} items={g.faq.length ? g.faq : d.home.faq} />
          <div className="mt-10 rounded-xl border border-warn-border bg-warn-bg p-4 text-sm leading-7 text-warn-ink"><strong>{d.common.warning}:</strong> {d.footer.disclaimerShort}</div>
        </div>
        <aside className="no-print space-y-6">
          <div className="card p-5 lg:sticky lg:top-24">
            <h2 className="text-sm font-black text-brand-800">{d.guides.tableOfContents}</h2>
            <ol className="mt-3 space-y-2 text-sm">
              {g.sections.map((s, i) => <li key={i}><a className="hover:text-brand-700 hover:underline" href={`#section-${i + 1}`}>{i + 1}. {s.h}</a></li>)}
            </ol>
          </div>
          {tools.length > 0 && (
            <div className="card p-5">
              <h2 className="text-sm font-black text-brand-800">{d.nav.tools}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {tools.map((t) => <li key={t.slug}><Link className="hover:text-brand-700 hover:underline" href={href(locale, `tools/${t.slug}`)}>{t.title} ←</Link></li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>
      {related.length > 0 && (
        <section className="mt-14" aria-labelledby="related-h">
          <h2 id="related-h" className="text-2xl font-black text-brand-800">{d.guides.relatedTitle}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <GuideCard key={r.slug} locale={locale} item={r} />)}
          </div>
        </section>
      )}
      {tools.length > 0 && (
        <section className="mt-12" aria-labelledby="related-tools-h">
          <h2 id="related-tools-h" className="text-xl font-black text-brand-800">{d.tools.relatedTitle}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => <ToolCard key={t.slug} locale={locale} d={d} item={t} />)}
          </div>
        </section>
      )}
    </>
  );
}
