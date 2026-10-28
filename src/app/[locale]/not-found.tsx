import Link from "next/link";
import { href } from "@/i18n/routes";

/** not-found لا يستقبل params في التصدير الثابت — لذلك الصفحة ثنائية اللغة بلا معاملات. */
export default function NotFound() {
  return (
    <div className="card mx-auto max-w-xl p-10 text-center">
      <p dir="ltr" className="text-6xl font-black text-brand-200">404</p>
      <h1 className="mt-4 text-2xl font-black text-brand-800">الصفحة غير موجودة</h1>
      <p className="mt-2 text-ink-600">ربما غيّرنا الرابط أو كتبته بشكل مختلف.</p>
      <h2 className="mt-5 text-lg font-black text-brand-800">Page introuvable</h2>
      <p className="mt-2 text-ink-600">Le lien a peut-être changé ou comporte une erreur.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href={href("ar")} className="btn btn-primary">العودة للرئيسية — العربية</Link>
        <Link href={href("fr")} className="btn btn-secondary">Retour à l’accueil — Français</Link>
      </div>
    </div>
  );
}
