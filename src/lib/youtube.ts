/** استخراج معرّف فيديو يوتيوب + بناء روابط الصور المصغّرة العامة. */
export function extractVideoId(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  // معرّف مباشر
  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw;
  let m: RegExpMatchArray | null = null;
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") m = u.pathname.slice(1).match(/^([A-Za-z0-9_-]{11})/);
    else if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      if (u.pathname === "/watch") m = (u.searchParams.get("v") ?? "").match(/^([A-Za-z0-9_-]{11})/);
      else m = u.pathname.match(/^\/(?:shorts|embed|live)\/([A-Za-z0-9_-]{11})/);
    }
  } catch {
    m = raw.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([A-Za-z0-9_-]{11})/);
  }
  return m ? m[1] : null;
}

export type ThumbnailVariant = {
  key: string;
  label: string;
  size: string;
  url: (id: string) => string;
  /** سلسلة البدائل عند غياب الصورة عالية الدقة. */
  fallbacks?: string[];
};

export const THUMBNAILS: ThumbnailVariant[] = [
  { key: "default", label: "افتراضية", size: "120×90", url: (id) => `https://img.youtube.com/vi/${id}/default.jpg` },
  { key: "mqdefault", label: "متوسطة", size: "320×180", url: (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg` },
  { key: "hqdefault", label: "عالية", size: "480×360", url: (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg` },
  {
    key: "maxresdefault", label: "الأعلى دقة", size: "1280×720",
    url: (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    fallbacks: ["sddefault", "hqdefault"],
  },
];

export function variantUrl(id: string, key: string): string {
  return `https://img.youtube.com/vi/${id}/${key}.jpg`;
}
