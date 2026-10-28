/** توليد هاشتاغات من قاعدة JSON ثابتة — بلا أي API أو تكلفة أو إرسال بيانات. */
export type HashtagData = {
  version: number;
  note: string;
  topics: { id: string; kw: string[]; ar: string[]; fr: string[]; en: string[] }[];
  platforms: Record<string, string[]>;
  generic: string[];
};

export type Platform = "instagram" | "tiktok" | "youtube" | "general";

/** يحوّل أي نص إلى وسم صالح: بلا فراغات ولا رموز، مع # واحدة فقط. */
export function normalizeTag(raw: string): string {
  const cleaned = raw
    .trim()
    .replace(/^#+/, "")
    .replace(/[\s\u200b\u200f\u00a0]+/g, "")
    .replace(/[^\p{L}\p{N}_]/gu, "");
  return cleaned ? `#${cleaned}` : "";
}

export function detectTopics(data: HashtagData, keyword: string): string[] {
  const k = keyword.trim().toLowerCase();
  if (!k) return [];
  const scored = data.topics
    .map((t) => {
      let score = 0;
      for (const w of t.kw) {
        const needle = w.toLowerCase().trim();
        if (!needle) continue;
        if (k === needle) score += 4;
        else if (k.includes(needle) || needle.includes(k)) score += 2;
      }
      return { id: t.id, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map((x) => x.id);
}

/** يُرجع 30 وسمًا فريدًا على الأكثر، مرتّبة من الأخص إلى الأعم. */
export function generateHashtags(
  data: HashtagData,
  opts: { keyword: string; platform: Platform; language: "ar" | "fr" },
): string[] {
  const k = opts.keyword.trim();
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (s: string) => {
    const tag = normalizeTag(s);
    if (tag && !seen.has(tag.toLowerCase())) {
      seen.add(tag.toLowerCase());
      out.push(tag);
    }
  };

  // 1) الوسم المشتق من الكلمة المفتاحية نفسها.
  if (k) push(k);

  // 2) المواضيع المطابقة: عربية ثم فرنسية/إنجليزية حسب اللغة.
  const ids = detectTopics(data, k);
  const matched = data.topics.filter((t) => ids.includes(t.id));
  if (opts.language === "ar") {
    for (const t of matched) for (const tag of t.ar) push(tag);
    for (const t of matched) for (const tag of t.fr) push(tag);
    for (const t of matched) for (const tag of t.en) push(tag);
  } else {
    for (const t of matched) for (const tag of t.fr) push(tag);
    for (const t of matched) for (const tag of t.en) push(tag);
    for (const t of matched) for (const tag of t.ar) push(tag);
  }

  // 3) إن لم يطابق الكلمة أي موضوع، نملأ من كل المواضيع باعتدال.
  for (const t of data.topics) {
    if (out.length >= 14) break;
    if (!ids.includes(t.id)) push((opts.language === "ar" ? t.ar : t.fr)[0]);
  }

  // 4) وسوم المنصة ثم الوسوم العامة حتى نصل إلى 30.
  const plat = data.platforms[opts.platform] ?? data.platforms.general ?? [];
  for (const tag of plat) push(tag);
  for (const tag of data.platforms.general ?? []) push(tag);
  for (const tag of data.generic ?? []) push(tag);

  return out.slice(0, 30);
}
