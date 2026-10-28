"use client";
import { useMemo, useState } from "react";
import { countText } from "@/lib/text";
import type { Dict, Locale } from "@/i18n/dict";

const t = {
  ar: { label: "النص", placeholder: "اكتب أو الصق نصك هنا…", words: "كلمات", chars: "أحرف مع الفراغات", noSpaces: "أحرف بلا فراغات", sentences: "جمل", paragraphs: "فقرات", reading: "دقيقة قراءة", clear: "مسح", sample: "إدراج نص تجريبي", top: "أكثر الكلمات تكرارًا" },
  fr: { label: "Texte", placeholder: "Écrivez ou collez votre texte ici…", words: "Mots", chars: "Caractères (espaces inclus)", noSpaces: "Caractères (sans espaces)", sentences: "Phrases", paragraphs: "Paragraphes", reading: "min de lecture", clear: "Effacer", sample: "Insérer un exemple", top: "Mots les plus fréquents" },
};
const SAMPLE_AR = "صناعة المحتوى ليست سباقًا في عدد الكلمات، بل في وضوح الفكرة. اكتب جملة قصيرة، ثم جملة أقصر، ثم احذف ما لا يخدم القارئ. النص الجيد يُقرأ مرة واحدة ويُفهم من المرة الأولى.";
const SAMPLE_FR = "Créer du contenu n'est pas une course au nombre de mots, mais une question de clarté. Écrivez une phrase courte, puis une phrase encore plus courte, puis supprimez ce qui n'aide pas le lecteur.";

export default function WordCounter({ locale, d }: { locale: Locale; d: Dict }) {
  const L = t[locale];
  const [text, setText] = useState("");
  const stats = useMemo(() => countText(text), [text]);
  const top = useMemo(() => {
    const m = new Map<string, number>();
    for (const w of text.replace(/[\u00a0\u202f\s]+/g, " ").trim().toLowerCase().split(" ")) {
      const clean = w.replace(/[^\p{L}\p{N}]/gu, "");
      if (clean.length > 2) m.set(clean, (m.get(clean) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [text]);
  const cells = [
    [L.words, stats.words], [L.chars, stats.chars], [L.noSpaces, stats.charsNoSpaces],
    [L.sentences, stats.sentences], [L.paragraphs, stats.paragraphs], [L.reading, stats.readingMinutes],
  ] as const;
  return (
    <div className="card p-6">
      <label className="label" htmlFor="wc-text">{L.label}</label>
      <textarea id="wc-text" className="field min-h-56 resize-y" value={text} onChange={(e) => setText(e.target.value)} placeholder={L.placeholder} />
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn btn-secondary" onClick={() => setText(locale === "ar" ? SAMPLE_AR : SAMPLE_FR)}>{L.sample}</button>
        <button type="button" className="btn btn-secondary" onClick={() => setText("")}>{L.clear}</button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cells.map(([label, val]) => (
          <div key={label} className="rounded-xl border border-line bg-ink-50 p-4 text-center">
            <div dir="ltr" className="text-2xl font-black text-brand-700">{val}</div>
            <div className="mt-1 text-xs font-bold text-ink-600">{label}</div>
          </div>
        ))}
      </div>
      {top.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-black text-ink-900">{L.top}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {top.map(([w, n]) => <span key={w} className="chip">{w} · {n}</span>)}
          </div>
        </div>
      )}
      <p className="mt-5 border-t border-line pt-4 text-xs leading-6 text-ink-600">{d.tools.usageNote} {d.common.words}: {stats.words}.</p>
    </div>
  );
}
