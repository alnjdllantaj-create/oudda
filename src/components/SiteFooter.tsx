import Link from "next/link";
import type { Dict, Locale } from "@/i18n/dict";
import { href } from "@/i18n/routes";

export default function SiteFooter({ locale, d }: { locale: Locale; d: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print mt-16 border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-black text-brand-800">{d.siteName} <span className="text-sm font-semibold text-ink-600">{d.siteNameLatin}</span></p>
          <p className="mt-2 text-sm leading-7 text-ink-600">{d.tagline}.</p>
          <p className="mt-3 text-xs text-ink-600">{d.footer.disclaimerShort}</p>
        </div>
        <div>
          <h2 className="text-sm font-black text-ink-900">{d.footer.links}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-brand-700" href={href(locale, "tools")}>{d.nav.tools}</Link></li>
            <li><Link className="hover:text-brand-700" href={href(locale, "guides")}>{d.nav.guides}</Link></li>
            <li><Link className="hover:text-brand-700" href={href(locale, "templates")}>{d.nav.templates}</Link></li>
            <li><Link className="hover:text-brand-700" href={href(locale, "about")}>{d.nav.about}</Link></li>
            <li><Link className="hover:text-brand-700" href={href(locale, "contact")}>{d.nav.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-black text-ink-900">{d.footer.legal}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-brand-700" href={href(locale, "privacy")}>{locale === "ar" ? "سياسة الخصوصية" : "Confidentialité"}</Link></li>
            <li><Link className="hover:text-brand-700" href={href(locale, "terms")}>{locale === "ar" ? "شروط الاستخدام" : "Conditions d'utilisation"}</Link></li>
            <li><Link className="hover:text-brand-700" href={href(locale, "disclaimer")}>{locale === "ar" ? "إخلاء المسؤولية" : "Avertissement"}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-ink-600">
        © {year} {d.siteName} — {d.footer.rights}. {d.footer.madeWith}
      </div>
    </footer>
  );
}
