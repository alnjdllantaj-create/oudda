import Link from "next/link";
import type { Dict, Locale } from "@/i18n/dict";
import { href } from "@/i18n/routes";
import { absoluteUrl } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "./JsonLd";

export type Crumb = { name: string; path?: string };

export default function Breadcrumbs({ locale, d, items }: { locale: Locale; d: Dict; items: Crumb[] }) {
  const all: Crumb[] = [{ name: d.common.breadcrumbHome, path: "" }, ...items];
  const ld = breadcrumbJsonLd(all.map((c, i) => ({
    name: c.name,
    url: i === 0 ? absoluteUrl(locale, "") : c.path ? absoluteUrl(locale, c.path) : null,
  })));
  return (
    <>
      <JsonLd data={ld} />
      <nav className="no-print mb-6 text-xs text-ink-600" aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.path && i < all.length - 1 ? (
                <Link className="hover:text-brand-700 hover:underline" href={href(locale, c.path)}>{c.name}</Link>
              ) : (
                <span aria-current={i === all.length - 1 ? "page" : undefined} className="font-bold text-ink-700">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
