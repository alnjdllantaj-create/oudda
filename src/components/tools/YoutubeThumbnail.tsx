"use client";
import { useState } from "react";
import { extractVideoId, THUMBNAILS, variantUrl } from "@/lib/youtube";
import type { Dict, Locale } from "@/i18n/dict";

const t = {
  ar: { label: "رابط الفيديو أو معرّفه", placeholder: "https://www.youtube.com/watch?v=…", show: "عرض الصور", copy: "نسخ رابط الصورة", open: "فتح الصورة", copyLink: "نسخ", copied: "تم النسخ ✓", error: "لم نتعرّف على معرّف فيديو صالح (11 حرفًا).", missing: "غير متوفرة لهذا الفيديو", rights: "تنبيه حقوق: هذه الصور مملوكة لأصحاب الفيديوهات. نعرض روابطها العامة فقط، ولا نوفّر تنزيلها مباشرة. استعمل صورك الخاصة أو اطلب إذن صاحب الفيديو.", id: "معرّف الفيديو", hint: "إن لم تتوفّر الصورة الأعلى دقة، نعرض البديل تلقائيًا." },
  fr: { label: "Lien de la vidéo ou son identifiant", placeholder: "https://www.youtube.com/watch?v=…", show: "Afficher les images", copy: "Copier le lien de l'image", open: "Ouvrir l'image", copyLink: "Copier", copied: "Copié ✓", error: "Identifiant de vidéo invalide (11 caractères attendus).", missing: "Indisponible pour cette vidéo", rights: "Droits d'auteur : ces images appartiennent aux ayants droit des vidéos. Nous affichons uniquement leurs URL publiques, sans téléchargement direct. Utilisez vos propres images ou demandez une autorisation.", id: "Identifiant", hint: "Si la résolution maximale est absente, un substitut s'affiche automatiquement." },
};

const FRENCH_VARIANT_LABELS: Record<string, string> = {
  default: "Par défaut",
  mqdefault: "Moyenne",
  hqdefault: "Haute qualité",
  maxresdefault: "Haute résolution",
};

type Cell = { key: string; label: string; size: string; url: string; failed: boolean };

export default function YoutubeThumbnail({ locale, d }: { locale: Locale; d: Dict }) {
  const L = t[locale];
  const [input, setInput] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [cells, setCells] = useState<Cell[]>([]);

  const build = (videoId: string): Cell[] => THUMBNAILS.map((v) => ({
    key: v.key,
    label: locale === "fr" ? (FRENCH_VARIANT_LABELS[v.key] ?? v.label) : v.label,
    size: v.size,
    url: variantUrl(videoId, v.key),
    failed: false,
  }));
  const onShow = () => {
    const found = extractVideoId(input);
    if (!found) { setError(L.error); setId(null); setCells([]); return; }
    setError(""); setId(found); setCells(build(found));
  };
  const onError = (key: string) => {
    setCells((prev) => prev.map((c) => {
      if (c.key !== key) return c;
      const variant = THUMBNAILS.find((v) => v.key === key);
      const next = (variant?.fallbacks ?? []).find((f) => !prev.some((p) => p.key === f && p.failed));
      return next ? { ...c, url: variantUrl(id ?? "", next), failed: false } : { ...c, failed: true };
    }));
  };
  const copy = async (url: string, key: string) => {
    try { await navigator.clipboard.writeText(url); setCopied(key); } catch { setCopied(null); }
  };
  return (
    <div className="card p-6">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input dir="ltr" className="field flex-1" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onShow()} placeholder={L.placeholder} aria-label={L.label} />
        <button type="button" className="btn btn-primary" onClick={onShow}>{L.show}</button>
      </div>
      {error && <p className="mt-3 text-sm font-bold text-red-700">{error}</p>}
      {id && <p dir="ltr" className="mt-3 text-xs text-ink-600">{L.id}: <span className="font-mono font-bold text-brand-700">{id}</span></p>}
      {cells.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {cells.map((c) => (
            <div key={c.key} className="overflow-hidden rounded-xl border border-line bg-white">
              <div className="flex aspect-video items-center justify-center bg-ink-50">
                {c.failed ? (
                  <span className="p-4 text-center text-xs text-ink-600">{L.missing}</span>
                ) : (
                  <img src={c.url} alt={`${c.label} — ${c.size}`} className="h-full w-full object-contain" onError={() => onError(c.key)} loading="lazy" />
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 p-3">
                <div><p className="text-sm font-black text-ink-900">{c.label}</p><p dir="ltr" className="text-xs text-ink-600">{c.size}</p></div>
                <div className="flex gap-2">
                  <button type="button" className="btn btn-secondary !px-3 !py-1.5 !text-xs" onClick={() => copy(c.url, c.key)}>{copied === c.key ? L.copied : L.copyLink}</button>
                  <a className="btn btn-secondary !px-3 !py-1.5 !text-xs" href={c.url} target="_blank" rel="noopener noreferrer">{L.open} ↗</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 rounded-xl border border-warn-border bg-warn-bg p-4 text-xs leading-6 text-warn-ink"><strong>{d.common.warning}:</strong> {L.rights}</div>
      <p className="mt-4 text-xs leading-6 text-ink-600">{L.hint} — {d.tools.usageNote}</p>
    </div>
  );
}
