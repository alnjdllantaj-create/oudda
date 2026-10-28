import Link from "next/link";
export default function RootNotFound() {
  return (
    <main className="mx-auto max-w-lg p-10 text-center">
      <p dir="ltr" className="text-6xl font-black text-brand-200">404</p>
      <h1 className="mt-4 text-2xl font-black text-brand-800">الصفحة غير موجودة — Page introuvable</h1>
      <div className="mt-6 flex justify-center gap-3">
        <Link className="btn btn-primary" href="/ar/">العربية</Link>
        <Link className="btn btn-secondary" href="/fr/">Français</Link>
      </div>
    </main>
  );
}
