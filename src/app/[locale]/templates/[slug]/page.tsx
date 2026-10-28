import type { Metadata } from "next";
import { getDict, LOCALES } from "@/i18n/dict";
import { TEMPLATES, TEMPLATE_SLUGS } from "@/content/templates";
import { buildMetadata } from "@/lib/seo";
import { readSlug } from "@/lib/page";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import PrintableTemplate from "@/components/PrintableTemplate";
import Icon from "@/components/Icons";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => TEMPLATE_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await readSlug(params, TEMPLATE_SLUGS);
  const doc = TEMPLATES[locale][slug];
  return buildMetadata({ locale, title: doc.title, description: doc.description, path: `templates/${slug}` });
}

export default async function TemplatePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await readSlug(params, TEMPLATE_SLUGS);
  const d = getDict(locale);
  const doc = TEMPLATES[locale][slug];
  return (
    <>
      <div className="no-print">
        <Breadcrumbs locale={locale} d={d} items={[{ name: d.nav.templates, path: "templates" }, { name: doc.title }]} />
        <div className="flex items-start gap-4">
          <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 sm:grid"><Icon name={doc.icon} /></span>
          <div>
            <h1 className="text-3xl font-black leading-tight text-brand-800">{doc.title}</h1>
            <p className="mt-3 max-w-2xl text-ink-600">{doc.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-8"><PrintableTemplate locale={locale} d={d} doc={doc} /></div>
      <div className="no-print mt-12">
        <section className="card p-6">
          <h2 className="text-xl font-black text-brand-800">{d.templates.howTitle}</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {doc.howTo.map((s, i) => <li key={i} className="flex gap-3 text-sm text-ink-700"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-700 text-xs font-black text-white">{i + 1}</span>{s}</li>)}
          </ol>
          <p className="mt-5 rounded-xl border border-warn-border bg-warn-bg p-4 text-xs leading-6 text-warn-ink"><strong>{d.templates.noteTitle}:</strong> {d.templates.privacyNote}</p>
        </section>
        <AdSlot d={d} slot={`template-${slug}`} />
        <Faq d={d} title={d.templates.faqTitle} items={doc.faq} />
      </div>
    </>
  );
}
