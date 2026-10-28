"use client";
import { useMemo, useState } from "react";
import data from "@/content/hashtags.json";
import { generateHashtags, type HashtagData, type Platform } from "@/lib/hashtags";
import type { Dict, Locale } from "@/i18n/dict";

const t = {
  ar: { keyword: "موضوع منشورك", placeholder: "مثال: وصفة طبخ، سفر، تصوير…", platform: "المنصة", generate: "ولّد 30 هاشتاغًا", copyAll: "نسخ الكل", copied: "تم النسخ ✓", result: "الهاشتاغات المقترحة", hint: "اختر 5–12 وسمًا فقط واحذف ما لا يصف منشورك فعلًا.", note: "قاعدة كلمات ثابتة داخل المتصفح: بلا ذكاء اصطناعي مدفوع، وبلا واجهة برمجية مدفوعة، وبلا إرسال كلماتك لأي جهة.", select: "انقر على الوسم لنسخه." },
  fr: { keyword: "Sujet de votre publication", placeholder: "ex. recette, voyage, photo…", platform: "Plateforme", generate: "Générer 30 hashtags", copyAll: "Tout copier", copied: "Copié ✓", result: "Hashtags proposés", hint: "Choisissez seulement 5 à 12 tags et supprimez ceux qui ne décrivent pas vraiment votre publication.", note: "Base de mots statique dans le navigateur : ni modèle d'IA payant, ni API payante, ni envoi de vos mots à un tiers.", select: "Cliquez sur un tag pour le copier." },
};
const PLATFORMS: Platform[] = ["instagram", "tiktok", "youtube", "general"];

export default function HashtagGenerator({ locale, d }: { locale: Locale; d: Dict }) {
  const L = t[locale];
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [tags, setTags] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const dataset = data as unknown as HashtagData;
  const count = useMemo(() => tags.length, [tags]);
  const generate = () => setTags(generateHashtags(dataset, { keyword, platform, language: locale }));
  const copy = async (text: string, key: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); } catch { setCopied(null); }
  };
  return (
    <div className="card p-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div>
          <label className="label" htmlFor="ht-keyword">{L.keyword}</label>
          <input id="ht-keyword" className="field" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && generate()} placeholder={L.placeholder} />
        </div>
        <div>
          <label className="label" htmlFor="ht-platform">{L.platform}</label>
          <select id="ht-platform" className="field" value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
            {PLATFORMS.map((p) => <option key={p} value={p}>{p === "general" ? (locale === "ar" ? "عام" : "Général") : p[0].toUpperCase() + p.slice(1)}</option>)}
          </select>
        </div>
        <div className="flex items-end"><button type="button" className="btn btn-primary w-full" onClick={generate}>{L.generate}</button></div>
      </div>
      {tags.length > 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-black text-ink-900">{L.result} <span className="text-brand-700">({count})</span></h3>
            <button type="button" className="btn btn-secondary !py-1.5 !text-xs" onClick={() => copy(tags.join(" "), "all")}>{copied === "all" ? L.copied : L.copyAll}</button>
          </div>
          <p className="mt-2 text-xs text-ink-600">{L.select}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button key={tag} type="button" onClick={() => copy(tag, tag)} className="chip hover:border-brand-500 hover:text-brand-700" title={L.select}>{copied === tag ? L.copied : tag}</button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-warn-border bg-warn-bg p-4 text-xs leading-6 text-warn-ink">{L.hint}</div>
        </div>
      )}
      <p className="mt-5 border-t border-line pt-4 text-xs leading-6 text-ink-600">{L.note} — {d.tools.usageNote}</p>
    </div>
  );
}
