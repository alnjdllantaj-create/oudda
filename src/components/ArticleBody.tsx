import type { ArticleSection } from "@/content/tools";

export function Section({ section, id }: { section: ArticleSection; id?: string }) {
  return (
    <section className="mt-9" aria-label={section.h}>
      <h2 id={id} className="scroll-mt-24 text-xl font-black text-brand-800">{section.h}</h2>
      {section.p.map((p, i) => <p key={i} className="prose-ar mt-4">{p}</p>)}
      {section.ul && (
        <ul className="mt-4 space-y-2 ps-6">
          {section.ul.map((li, i) => (
            <li key={i} className="prose-ar list-disc marker:text-brand-600">{li}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function ArticleBody({ intro, sections }: { intro: string[]; sections: ArticleSection[] }) {
  return (
    <article className="card p-6 sm:p-9">
      {intro.map((p, i) => <p key={i} className="prose-ar mb-4 text-[1.02rem]">{p}</p>)}
      {sections.map((s, i) => <Section key={i} section={s} id={`section-${i + 1}`} />)}
    </article>
  );
}
