import type { Metadata } from "next";
import Link from "next/link";
import { getDict, LOCALES } from "@/i18n/dict";
import { href } from "@/i18n/routes";
import { TOOLS, TOOL_SLUGS } from "@/content/tools";
import { buildMetadata, articleJsonLd, absoluteUrl } from "@/lib/seo";
import { readSlug } from "@/lib/page";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleBody, { Section } from "@/components/ArticleBody";
import ToolRenderer from "@/components/ToolRenderer";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icons";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => TOOL_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await readSlug(params, TOOL_SLUGS);
  const doc = TOOLS[locale][slug];
  return buildMetadata({ locale, title: doc.title, description: doc.short, path: `tools/${slug}` });
}

export default async function ToolPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await readSlug(params, TOOL_SLUGS);
  const d = getDict(locale);
  const doc = TOOLS[locale][slug];
  const related = TOOL_SLUGS.filter((s) => s !== slug).slice(0, 3).map((s) => TOOLS[locale][s]);
  const toc = doc.sections.map((s, i) => ({ h: s.h, id: `section-${i + 1}` }));
  return (
    <>
      <JsonLd data={articleJsonLd({ title: doc.title, description: doc.short, url: absoluteUrl(locale, `tools/${slug}`), locale })} />
      <Breadcrumbs locale={locale} d={d} items={[{ name: d.nav.tools, path: "tools" }, { name: doc.title }]} />
      <div className="flex items-start gap-4">
        <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 sm:grid"><Icon name={doc.icon} /></span>
        <div>
          <h1 className="text-3xl font-black leading-tight text-brand-800">{doc.h1}</h1>
          <p className="mt-3 max-w-2xl text-ink-600">{doc.short}</p>
        </div>
      </div>
      <div className="mt-8" id="tool"><ToolRenderer slug={slug} locale={locale} d={d} /></div>
      <AdSlot d={d} slot={`tool-${slug}`} />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_260px]">
        <div>
          <ArticleBody intro={doc.intro} sections={doc.sections} />
          <section className="mt-10 card p-6" aria-labelledby="how-h">
            <h2 id="how-h" className="text-xl font-black text-brand-800">{d.tools.howTitle}</h2>
            <ol className="mt-4 space-y-3">
              {toc.map((x, i) => (
                <li key={x.id} className="flex gap-3 text-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-700 text-xs font-black text-white">{i + 1}</span>
                  <a href={`#${x.id}`} className="font-bold text-ink-700 hover:text-brand-700 hover:underline">{x.h}</a>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-ink-600">{d.tools.usageNote}</p>
          </section>
          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card p-6">
              <h2 className="text-lg font-black text-brand-800">{d.tools.tipsTitle}</h2>
              <ul className="mt-3 space-y-2">{doc.tips.map((x, i) => <li key={i} className="prose-ar list-disc ps-5 marker:text-brand-600">{x}</li>)}</ul>
            </div>
            <div className="card p-6">
              <h2 className="text-lg font-black text-brand-800">{d.tools.mistakesTitle}</h2>
              <ul className="mt-3 space-y-2">{doc.mistakes.map((x, i) => <li key={i} className="prose-ar list-disc ps-5 marker:text-amber-600">{x}</li>)}</ul>
            </div>
          </section>
          <div className="mt-8 rounded-xl border border-warn-border bg-warn-bg p-4 text-sm leading-7 text-warn-ink">
            <strong>{d.tools.noteTitle}:</strong> {d.footer.disclaimerShort}
          </div>
        </div>
        <aside className="no-print space-y-6">
          <div className="card p-5 lg:sticky lg:top-24">
            <h2 className="text-sm font-black text-brand-800">{d.common.tableOfContents}</h2>
            <ol className="mt-3 space-y-2 text-sm">
              {toc.map((x, i) => <li key={x.id}><a className="hover:text-brand-700 hover:underline" href={`#${x.id}`}>{i + 1}. {x.h}</a></li>)}
            </ol>
            <a href="#tool" className="btn btn-secondary mt-4 w-full">{d.tools.launch}</a>
          </div>
          <div className="card p-5">
            <h2 className="text-sm font-black text-brand-800">{d.tools.relatedTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {related.map((r) => <li key={r.slug}><Link className="flex items-center gap-2 hover:text-brand-700 hover:underline" href={href(locale, `tools/${r.slug}`)}><Icon name={r.icon} className="h-4 w-4" />{r.title}</Link></li>)}
            </ul>
          </div>
        </aside>
      </div>
      <Faq d={d} title={d.tools.faqTitle} items={doc.faq} />
    </>
  );
}
