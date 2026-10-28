"use client";
import { useRef } from "react";
import type { Dict, Locale } from "@/i18n/dict";
import type { TemplateDoc, TemplateField } from "@/content/templates";

function Field({ f, d }: { f: TemplateField; d: Dict }) {
  if (f.kind === "line" || f.kind === "lines") {
    const n = f.kind === "line" ? 1 : f.count;
    return (
      <div className="mb-4 break-inside-avoid">
        <p className="mb-1.5 text-sm font-bold text-ink-900">{f.label}</p>
        {Array.from({ length: n }).map((_, i) => (
          <div key={i} className="print-box mb-1 min-h-9 rounded-md border border-line p-1" contentEditable suppressContentEditableWarning role="textbox" aria-label={f.label} data-editable="true" />
        ))}
      </div>
    );
  }
  if (f.kind === "box") {
    const h = f.height === "lg" ? "min-h-40" : f.height === "md" ? "min-h-24" : "min-h-16";
    return (
      <div className="mb-4 break-inside-avoid">
        <p className="mb-1.5 text-sm font-bold text-ink-900">{f.label}</p>
        <div className={`print-box ${h} rounded-md border border-line p-2`} contentEditable suppressContentEditableWarning role="textbox" aria-label={f.label} data-editable="true" />
      </div>
    );
  }
  if (f.kind === "grid") {
    const cells: string[] = [];
    for (let r = 0; r < f.rows; r++) for (let c = 0; c < f.cols; c++) cells.push(r === 0 ? (f.cells[c] ?? "") : "");
    return (
      <div className="mb-5 break-inside-avoid">
        <p className="mb-2 text-sm font-black text-brand-800">{f.label}</p>
        <div className="grid gap-0 overflow-hidden rounded-md border border-line" style={{ gridTemplateColumns: `repeat(${f.cols}, minmax(0, 1fr))` }}>
          {cells.map((cell, i) => (
            <div key={i} className={`print-box min-h-9 border-b border-e border-line p-1 text-[11px] ${i < f.cols ? "bg-ink-50 font-black text-ink-700" : ""}`} contentEditable suppressContentEditableWarning role="textbox" aria-label={`${f.label} ${i + 1}`} data-editable="true">{cell}</div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mb-5 break-inside-avoid">
      <p className="mb-2 text-sm font-black text-brand-800">{f.label}</p>
      <ul className="space-y-2">
        {f.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
            <span className="mt-1 inline-block h-4 w-4 shrink-0 rounded border border-ink-300" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-ink-300">{d.templates.blank}</p>
    </div>
  );
}

export default function PrintableTemplate({ locale, d, doc }: { locale: Locale; d: Dict; doc: TemplateDoc }) {
  const sheet = useRef<HTMLDivElement>(null);
  const clear = () => {
    sheet.current?.querySelectorAll<HTMLElement>("[data-editable]").forEach((el) => {
      if (!el.getAttribute("aria-label")?.includes("1")) el.textContent = "";
    });
  };
  return (
    <div>
      <div className="no-print mb-4 flex flex-wrap items-center gap-2">
        <button type="button" className="btn btn-primary" onClick={() => window.print()}>{d.templates.print}</button>
        <button type="button" className="btn btn-secondary" onClick={clear}>{d.templates.clear}</button>
        <span className="text-xs text-ink-600">{d.templates.editHint}</span>
      </div>
      <div ref={sheet} dir={locale === "ar" ? "rtl" : "ltr"} className="print-sheet card mx-auto max-w-3xl p-8 sm:p-12">
        <header className="mb-8 border-b-2 border-brand-700 pb-4">
          <p className="text-xs font-bold text-brand-700">{d.siteName} · {d.siteNameLatin}</p>
          <h2 className="mt-1 text-2xl font-black text-ink-900">{doc.printTitle}</h2>
          <p className="mt-2 text-xs text-ink-600">{d.templates.printTitle} — {d.templates.privacyNote}</p>
        </header>
        {doc.fields.map((f, i) => <Field key={i} f={f} d={d} />)}
        <footer className="mt-8 border-t border-line pt-3 text-center text-[10px] text-ink-300">{d.footer.disclaimerShort}</footer>
      </div>
    </div>
  );
}
