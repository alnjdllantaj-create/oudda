import Link from "next/link";
import type { Dict, Locale } from "@/i18n/dict";
import { href } from "@/i18n/routes";
import type { LegalDoc } from "@/content/legal";
import ArticleBody from "./ArticleBody";
import Breadcrumbs from "./Breadcrumbs";
import AdSlot from "./AdSlot";
import Faq from "./Faq";

export default function LegalPage({ locale, d, doc, section, children }: {
  locale: Locale; d: Dict; doc: LegalDoc; section: string; children?: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs locale={locale} d={d} items={[{ name: doc.title }]} />
      <h1 className="text-3xl font-black text-brand-800">{doc.title}</h1>
      <p className="mt-3 max-w-2xl text-ink-600">{doc.description}</p>
      <p className="mt-2 text-xs text-ink-600">{d.common.lastUpdated}: 2026-10-27</p>
      {children}
      <div className="mt-8"><ArticleBody intro={doc.intro} sections={doc.sections} /></div>
      <AdSlot d={d} slot={`legal-${section}`} />
      {doc.faq && <Faq d={d} title={locale === "ar" ? "أسئلة شائعة" : "Questions fréquentes"} items={doc.faq} />}
      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link className="btn btn-secondary" href={href(locale, "privacy")}>{locale === "ar" ? "سياسة الخصوصية" : "Confidentialité"}</Link>
        <Link className="btn btn-secondary" href={href(locale, "terms")}>{locale === "ar" ? "شروط الاستخدام" : "Conditions"}</Link>
        <Link className="btn btn-secondary" href={href(locale, "disclaimer")}>{locale === "ar" ? "إخلاء المسؤولية" : "Avertissement"}</Link>
      </div>
    </>
  );
}
