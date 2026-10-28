/** مولّد كلمات سر آمن — عشوائية تشفيرية من Web Crypto، بلا أي انحياز. */
export type PasswordOptions = {
  length: number;
  upper: boolean;
  lower: boolean;
  digits: boolean;
  symbols: boolean;
};

const SETS = {
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lower: "abcdefghijkmnopqrstuvwxyz",
  digits: "23456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?",
};

export function charsetFor(o: PasswordOptions): string {
  return (
    (o.upper ? SETS.upper : "") +
    (o.lower ? SETS.lower : "") +
    (o.digits ? SETS.digits : "") +
    (o.symbols ? SETS.symbols : "")
  );
}

/** رفض القيم الخارجة عن النطاق (rejection sampling) لتفادي modulo bias. */
function randomIndex(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  let v = 0;
  do {
    crypto.getRandomValues(buf);
    v = buf[0];
  } while (v >= limit);
  return v % max;
}

export function entropyBits(length: number, charsetSize: number): number {
  if (charsetSize <= 1) return 0;
  return length * (Math.log(charsetSize) / Math.log(2));
}

export function strengthLabel(bits: number): "weak" | "medium" | "strong" {
  if (bits < 50) return "weak";
  if (bits < 80) return "medium";
  return "strong";
}

export function generatePassword(o: PasswordOptions): string {
  const length = Math.min(50, Math.max(8, Math.floor(o.length)));
  const active = (["upper", "lower", "digits", "symbols"] as const).filter((k) => o[k]);
  const charset = charsetFor(o);
  if (charset.length === 0 || active.length === 0) return "";
  const out: string[] = [];
  // ضمن حرف واحد على الأقل من كل مجموعة مفعّلة.
  for (const key of active) {
    const set = SETS[key];
    out.push(set[randomIndex(set.length)]);
  }
  while (out.length < length) out.push(charset[randomIndex(charset.length)]);
  // خلط عشوائي آمن (Fisher–Yates) حتى لا تكون الحروف الأولى متوقّعة.
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out.join("");
}
