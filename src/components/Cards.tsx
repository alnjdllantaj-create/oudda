import Link from "next/link";
import type { Dict, Locale } from "@/i18n/dict";
import { href } from "@/i18n/routes";
import Icon from "./Icons";

export function ToolCard({ locale, d, item }: { locale: Locale; d: Dict; item: { slug: string; icon: string; title: string; short: string; color: string } }) {
  return (
    <Link href={href(locale, `tools/${item.slug}`)} className="card group flex flex-col gap-3 p-5 transition-shadow hover:shadow-md">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon name={item.icon} /></span>
      <h3 className="text-lg font-black text-ink-900 group-hover:text-brand-700">{item.title}</h3>
      <p className="text-sm leading-7 text-ink-600">{item.short}</p>
      <span className="mt-auto pt-2 text-sm font-bold text-brand-700">{d.tools.launch} ←</span>
    </Link>
  );
}

export function GuideCard({ locale, item }: { locale: Locale; item: { slug: string; category: string; title: string; description: string } }) {
  return (
    <Link href={href(locale, `guides/${item.slug}`)} className="card group flex flex-col gap-2 p-5 transition-shadow hover:shadow-md">
      <span className="chip w-fit">{item.category}</span>
      <h3 className="text-lg font-black leading-snug text-ink-900 group-hover:text-brand-700">{item.title}</h3>
      <p className="text-sm leading-7 text-ink-600">{item.description}</p>
    </Link>
  );
}

export function TemplateCard({ locale, d, item }: { locale: Locale; d: Dict; item: { slug: string; icon: string; title: string; short: string } }) {
  return (
    <Link href={href(locale, `templates/${item.slug}`)} className="card group flex flex-col gap-3 p-5 transition-shadow hover:shadow-md">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon name={item.icon} /></span>
      <h3 className="text-lg font-black text-ink-900 group-hover:text-brand-700">{item.title}</h3>
      <p className="text-sm leading-7 text-ink-600">{item.short}</p>
      <span className="mt-auto pt-2 text-sm font-bold text-brand-700">{d.templates.print} ←</span>
    </Link>
  );
}
