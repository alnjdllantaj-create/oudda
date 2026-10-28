import { LOCALES } from "@/i18n/dict";

/** صفحة اختيار اللغة — لا تُرسل canonical لأن النطاق قد لا يكون مضبوطًا. */
export default function RootPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <meta httpEquiv="refresh" content="6; url=/ar/" />
      <div className="card w-full p-8">
        <p className="text-3xl font-extrabold text-brand-700">عُدّة</p>
        <p className="mt-1 text-sm text-ink-600">Oudda — أدوات صانع المحتوى</p>
        <h1 className="mt-6 text-xl font-extrabold text-brand-800">اختر لغتك — Choisissez votre langue</h1>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {LOCALES.map((l) => (
            <a key={l} href={`/${l}/`} className="btn btn-primary" hrefLang={l}>
              {l === "ar" ? "العربية" : "Français"}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
