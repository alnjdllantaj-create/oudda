import type { Dict } from "@/i18n/dict";
import { faqJsonLd } from "@/lib/seo";
import JsonLd from "./JsonLd";

export default function Faq({ d, title, items }: { d: Dict; title: string; items: readonly { q: string; a: string }[] }) {
  return (
    <section className="mt-12" aria-labelledby="faq-h">
      <JsonLd data={faqJsonLd(items.map((i) => ({ q: i.q, a: i.a })))} />
      <h2 id="faq-h" className="text-2xl font-black text-brand-800">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.map((item, i) => (
          <details key={i} className="card group px-5 py-4">
            <summary className="cursor-pointer list-none font-bold text-ink-900 marker:content-none">
              <span className="ms-2 inline-block text-brand-600 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              {item.q}
            </summary>
            <p className="prose-ar mt-3 border-t border-line pt-3">{item.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink-600">{d.footer.disclaimerShort}</p>
    </section>
  );
}
