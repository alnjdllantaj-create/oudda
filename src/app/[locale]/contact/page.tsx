import type { Metadata } from "next";
import { getDict, LOCALES } from "@/i18n/dict";
import { LEGAL } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import { readLocale } from "@/lib/page";
import LegalPage from "@/components/LegalPage";
import Icon from "@/components/Icons";

export function generateStaticParams() { return LOCALES.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await readLocale(params);
  const doc = LEGAL[locale]["contact"];
  return buildMetadata({ locale, title: doc.title, description: doc.description, path: "contact" });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params); const d = getDict(locale);
  const raw = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim();
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : null;
  const notice = locale === "ar"
    ? "لم يُضبط بريد التواصل بعد. على مالك الموقع تعيين NEXT_PUBLIC_CONTACT_EMAIL ثم إعادة بناء الموقع. لا نضع عنوانًا وهميًا."
    : "L'adresse de contact n'est pas encore configurée. Le propriétaire doit définir NEXT_PUBLIC_CONTACT_EMAIL puis reconstruire le site. Nous n'affichons pas d'adresse fictive.";
  const subject = locale === "ar" ? "رسالة من موقع عُدّة" : "Message depuis Oudda";
  return (
    <LegalPage locale={locale} d={d} doc={LEGAL[locale]["contact"]} section="contact">
      <div className="mt-6 rounded-2xl border border-line bg-white p-6">
        {email ? (
          <a className="btn btn-primary" href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}>
            <Icon name="mail" className="h-4 w-4" />{email}
          </a>
        ) : (
          <p className="text-sm leading-7 text-warn-ink">{notice}</p>
        )}
        <p className="mt-3 text-xs text-ink-600">{d.templates.privacyNote}</p>
      </div>
    </LegalPage>
  );
}
