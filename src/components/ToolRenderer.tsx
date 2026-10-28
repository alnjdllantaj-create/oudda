"use client";
import type { Dict, Locale } from "@/i18n/dict";
import QrGenerator from "./tools/QrGenerator";
import WordCounter from "./tools/WordCounter";
import PasswordGenerator from "./tools/PasswordGenerator";
import YoutubeThumbnail from "./tools/YoutubeThumbnail";
import HashtagGenerator from "./tools/HashtagGenerator";

/** اختيار ثابت — لا تحميل ديناميكي ولا أي طلب شبكة إضافي. */
export default function ToolRenderer({ slug, locale, d }: { slug: string; locale: Locale; d: Dict }) {
  const props = { locale, d };
  switch (slug) {
    case "qr-generator": return <QrGenerator {...props} />;
    case "word-counter": return <WordCounter {...props} />;
    case "password-generator": return <PasswordGenerator {...props} />;
    case "youtube-thumbnail": return <YoutubeThumbnail {...props} />;
    case "hashtag-generator": return <HashtagGenerator {...props} />;
    default: return null;
  }
}
