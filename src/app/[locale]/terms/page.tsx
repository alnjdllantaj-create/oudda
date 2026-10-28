import type { Metadata } from "next";
import { getDict, LOCALES } from "@/i18n/dict";
import { LEGAL } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import { readLocale } from "@/lib/page";
import LegalPage from "@/components/LegalPage";

export function generateStaticParams() { return LOCALES.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await readLocale(params);
  const doc = LEGAL[locale]["terms"];
  return buildMetadata({ locale, title: doc.title, description: doc.description, path: "terms" });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params); const d = getDict(locale);
  return <LegalPage locale={locale} d={d} doc={LEGAL[locale]["terms"]} section="terms" />;
}
