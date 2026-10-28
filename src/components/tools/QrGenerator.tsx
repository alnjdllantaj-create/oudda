"use client";
import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import type { Dict, Locale } from "@/i18n/dict";

const t = {
  ar: { text: "النص أو الرابط", placeholder: "https://your-site.com/page", size: "حجم الصورة", fg: "لون المقدّمة", bg: "لون الخلفية", level: "تصحيح الخطأ", download: "تحميل PNG", empty: "اكتب نصًا أو رابطًا أولًا.", hint: "يُنشأ الرمز داخل متصفحك — لا نرسل الرابط لأي خادم.", levelHint: "كلما زاد المستوى زادت قدرة الرمز على تحمّل التلف، وزادت كثافة مربّعاته." },
  fr: { text: "Texte ou lien", placeholder: "https://votre-site.com/page", size: "Taille de l'image", fg: "Couleur du premier plan", bg: "Couleur de fond", level: "Correction d'erreur", download: "Télécharger PNG", empty: "Saisissez d'abord un texte ou un lien.", hint: "Le code est généré dans votre navigateur — aucun lien n'est envoyé à un serveur.", levelHint: "Plus le niveau est élevé, plus le code résiste aux dégâts, mais plus il est dense." },
};

export default function QrGenerator({ locale, d }: { locale: Locale; d: Dict }) {
  const L = t[locale];
  const [value, setValue] = useState("");
  const [size, setSize] = useState(320);
  const [fg, setFg] = useState("#12513a");
  const [bg, setBg] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [msg, setMsg] = useState("");
  const box = useRef<HTMLDivElement>(null);

  const download = () => {
    setMsg("");
    if (!value.trim()) { setMsg(L.empty); return; }
    const canvas = box.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "oudda-qr.png";
    a.click();
  };

  return (
    <div className="card p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="label" htmlFor="qr-text">{L.text}</label>
            <textarea id="qr-text" className="field resize-y" rows={3} value={value} onChange={(e) => setValue(e.target.value)} placeholder={L.placeholder} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="qr-size">{L.size}</label>
              <select id="qr-size" className="field" value={size} onChange={(e) => setSize(Number(e.target.value))}>
                <option value={200}>200 × 200</option><option value={320}>320 × 320</option>
                <option value={500}>500 × 500</option><option value={800}>800 × 800</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="qr-level">{L.level}</label>
              <select id="qr-level" className="field" value={level} onChange={(e) => setLevel(e.target.value as "L" | "M" | "Q" | "H")}>
                <option value="L">L — 7%</option><option value="M">M — 15%</option><option value="Q">Q — 25%</option><option value="H">H — 30%</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="qr-fg">{L.fg}</label>
              <input id="qr-fg" type="color" className="field h-[42px] p-1" value={fg} onChange={(e) => setFg(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="qr-bg">{L.bg}</label>
              <input id="qr-bg" type="color" className="field h-[42px] p-1" value={bg} onChange={(e) => setBg(e.target.value)} />
            </div>
          </div>
          <p className="text-xs leading-6 text-ink-600">{L.levelHint}</p>
          <button type="button" onClick={download} className="btn btn-primary w-full">{L.download}</button>
          {msg && <p className="text-sm font-bold text-amber-700">{msg}</p>}
          <p className="text-xs leading-6 text-ink-600">{L.hint}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-white p-6">
          <div ref={box} className="rounded-xl bg-white p-2">
            {value.trim() ? (
              <QRCodeCanvas value={value} size={Math.min(size, 320)} level={level} fgColor={fg} bgColor={bg} marginSize={4} title="QR" />
            ) : (
              <div className="grid h-[220px] w-[220px] place-items-center rounded-xl bg-ink-50 text-6xl text-ink-300">QR</div>
            )}
          </div>
          <span className="text-xs text-ink-600">{size} × {size} px</span>
        </div>
      </div>
      <p className="mt-5 border-t border-line pt-4 text-xs leading-6 text-ink-600">{d.tools.usageNote}</p>
    </div>
  );
}
