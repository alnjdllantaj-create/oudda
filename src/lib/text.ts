/** عدّاد النص — محض JS، يعمل في المتصفح والخادم. */
export type TextStats = {
  words: number;
  chars: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
};

const AR_SENTENCE_END = /[.!?؟!۔;:]+|\.{3,}/g;

export function countText(raw: string): TextStats {
  // توحيد كل أنواع الفراغات (بما فيها NBSP والفراغ الرقيق) إلى فراغ عادي.
  const text = raw.replace(/[\u00a0\u202f\u2009\u2007\u061f\s]+/g, " ").trim();
  if (text === "") {
    return { words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingMinutes: 0 };
  }
  const words = text.split(" ").filter(Boolean).length;
  const chars = [...text].length;
  const charsNoSpaces = [...text.replace(/ /g, "")].length;
  const sentenceParts = text
    .split(AR_SENTENCE_END)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const sentences = Math.max(1, sentenceParts.length);
  const paragraphs = raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length || 1;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));
  return { words, chars, charsNoSpaces, sentences, paragraphs, readingMinutes };
}
