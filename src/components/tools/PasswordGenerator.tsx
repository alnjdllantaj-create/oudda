"use client";
import { useEffect, useState } from "react";
import { charsetFor, entropyBits, generatePassword, strengthLabel } from "@/lib/password";
import type { Dict, Locale } from "@/i18n/dict";

const t = {
  ar: { length: "الطول", upper: "أحرف كبيرة (A–Z)", lower: "أحرف صغيرة (a–z)", digits: "أرقام (2–9)", symbols: "رموز (!@#…)", generate: "توليد كلمة سر جديدة", copy: "نسخ", copied: "تم النسخ ✓", entropy: "القوّة التقديرية", weak: "ضعيفة", medium: "متوسطة", strong: "قوية", note: "تُولَّد بـ Web Crypto داخل متصفحك، ولا تُرسل لأي جهة. لا نستعمل أي مولّد عشوائي غير آمن.", empty: "فعّل مجموعة أحرف واحدة على الأقل." },
  fr: { length: "Longueur", upper: "Majuscules (A–Z)", lower: "Minuscules (a–z)", digits: "Chiffres (2–9)", symbols: "Symboles (!@#…)", generate: "Générer un nouveau mot de passe", copy: "Copier", copied: "Copié ✓", entropy: "Robustesse estimée", weak: "Faible", medium: "Moyenne", strong: "Forte", note: "Généré avec Web Crypto dans votre navigateur, jamais envoyé. Nous n'utilisons aucun générateur aléatoire non sécurisé.", empty: "Activez au moins un jeu de caractères." },
};

export default function PasswordGenerator({ locale, d }: { locale: Locale; d: Dict }) {
  const L = t[locale];
  const [opts, setOpts] = useState({ length: 16, upper: true, lower: true, digits: true, symbols: false });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const bits = entropyBits(opts.length, charsetFor(opts).length);
  const strength = strengthLabel(bits);
  const make = () => { setPassword(generatePassword(opts)); setCopied(false); };
  // التوليد يتم بعد التركيب فقط: لا يوجد Web Crypto موثوق أثناء التصيير المسبق على الخادم.
  useEffect(() => {
    queueMicrotask(() => setPassword(generatePassword({ length: 16, upper: true, lower: true, digits: true, symbols: false })));
  }, []);
  const copy = async () => {
    if (!password) return;
    try { await navigator.clipboard.writeText(password); setCopied(true); } catch { setCopied(false); }
  };
  return (
    <div className="card p-6" dir="ltr">
      <div className="rounded-xl border border-line bg-ink-50 p-5 text-center">
        <p className="break-all font-mono text-lg font-black tracking-wide text-brand-800 sm:text-2xl" aria-live="polite">{password || "…"}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={copy} className="btn btn-secondary" disabled={!password}>{copied ? L.copied : L.copy}</button>
          <button type="button" onClick={make} className="btn btn-primary">{L.generate}</button>
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="pw-length">{L.length}: <span className="font-black text-brand-700">{opts.length}</span></label>
          <input id="pw-length" type="range" min={8} max={50} value={opts.length} onChange={(e) => setOpts({ ...opts, length: Number(e.target.value) })} className="w-full accent-[#12513a]" />
        </div>
        <div className="rounded-xl border border-line p-3 text-center text-sm">
          <span className="font-bold">{L.entropy}: </span>
          <span className={strength === "strong" ? "font-black text-brand-700" : strength === "medium" ? "font-black text-amber-700" : "font-black text-red-700"}>
            {Math.round(bits)} bits · {strength === "strong" ? L.strong : strength === "medium" ? L.medium : L.weak}
          </span>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2" dir={locale === "ar" ? "rtl" : "ltr"}>
        {([["upper", L.upper], ["lower", L.lower], ["digits", L.digits], ["symbols", L.symbols]] as const).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink-700">
            <input type="checkbox" checked={opts[key]} onChange={(e) => setOpts({ ...opts, [key]: e.target.checked })} className="h-4 w-4 accent-[#12513a]" />
            {label}
          </label>
        ))}
      </div>
      {charsetFor(opts).length === 0 && <p className="mt-3 text-sm font-bold text-red-700">{L.empty}</p>}
      <p className={`mt-5 border-t border-line pt-4 text-xs leading-6 text-ink-600 ${locale === "ar" ? "text-right" : "text-left"}`} dir={locale === "ar" ? "rtl" : "ltr"}>{L.note} — {d.tools.usageNote}</p>
    </div>
  );
}
