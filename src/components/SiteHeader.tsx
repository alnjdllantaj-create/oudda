"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dict, Locale } from "@/i18n/dict";
import { href, switchLocalePath } from "@/i18n/routes";
import Icon from "./Icons";

export default function SiteHeader({ locale, d }: { locale: Locale; d: Dict }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { key: "tools", label: d.nav.tools, to: href(locale, "tools"), icon: "qr" },
    { key: "guides", label: d.nav.guides, to: href(locale, "guides"), icon: "book" },
    { key: "templates", label: d.nav.templates, to: href(locale, "templates"), icon: "clipboard" },
    { key: "about", label: d.nav.about, to: href(locale, "about"), icon: "sparkle" },
    { key: "contact", label: d.nav.contact, to: href(locale, "contact"), icon: "mail" },
  ];
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href={href(locale)} className="flex items-center gap-2 text-brand-800" aria-label={d.siteName}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-700 text-lg font-black text-white">ع</span>
          <span className="text-lg font-black leading-none">{d.siteName}</span>
          <span className="hidden text-xs font-semibold text-ink-600 sm:inline">{d.siteNameLatin}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="main">
          {links.map((l) => (
            <Link key={l.key} href={l.to} className={`rounded-lg px-3 py-2 text-sm font-bold hover:bg-brand-50 ${pathname === l.to ? "text-brand-700" : "text-ink-700"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href={switchLocalePath(pathname, locale === "ar" ? "fr" : "ar")} hrefLang={locale === "ar" ? "fr" : "ar"} className="btn btn-secondary !px-3 !py-2" title={d.nav.language}>
            <Icon name="globe" className="h-4 w-4" />
            <span className="text-xs">{locale === "ar" ? "FR" : "العربية"}</span>
          </Link>
          <button type="button" className="btn btn-secondary !px-3 !py-2 md:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? d.nav.close : d.nav.menu}>
            <Icon name={open ? "hash" : "list"} className="h-4 w-4" />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-white px-4 py-3 md:hidden" aria-label="mobile">
          <div className="grid grid-cols-2 gap-2">
            {links.map((l) => (
              <Link key={l.key} href={l.to} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl border border-line px-3 py-3 text-sm font-bold text-ink-700">
                <Icon name={l.icon} className="h-4 w-4 text-brand-600" />{l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
