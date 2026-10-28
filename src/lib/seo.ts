import type { Metadata } from "next";
import type { Locale } from "@/i18n/dict";
import { href } from "@/i18n/routes";

/** النطاق الحقيقي فقط — لا نطلق أي رابط مختلق أبدًا. */
export function getSiteUrl(): string | null {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, "");
  return /^https?:\/\/.+\..+/.test(raw) ? raw : null;
}

export function absoluteUrl(locale: Locale, path = ""): string | null {
  const base = getSiteUrl();
  return base ? `${base}${href(locale, path)}` : null;
}

export function buildMetadata(opts: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const { locale, title, description, path = "" } = opts;
  const base = getSiteUrl();
  const canonical = absoluteUrl(locale, path);
  const alternates: Metadata["alternates"] = base
    ? {
        canonical,
        languages: { ar: `${base}${href("ar", path)}`, fr: `${base}${href("fr", path)}`, "x-default": `${base}${href("ar", path)}` },
      }
    : { languages: { ar: href("ar", path), fr: href("fr", path) } };
  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_MA" : "fr_FR",
      title,
      description,
      ...(canonical ? { url: canonical } : {}),
      siteName: "عُدّة | Oudda",
    },
    twitter: { card: "summary", title, description },
    robots: { index: true, follow: true },
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string | null }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, idx) => ({
      "@type": "ListItem", position: idx + 1, name: i.name,
      ...(i.url ? { item: i.url } : {}),
    })),
  };
}

export function articleJsonLd(opts: { title: string; description: string; url: string | null; locale: Locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    inLanguage: opts.locale === "ar" ? "ar" : "fr",
    ...(opts.url ? { mainEntityOfPage: opts.url } : {}),
    author: { "@type": "Organization", name: "عُدّة | Oudda" },
    publisher: { "@type": "Organization", name: "عُدّة | Oudda" },
  };
}
