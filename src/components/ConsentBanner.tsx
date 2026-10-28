"use client";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import type { Dict, Locale } from "@/i18n/dict";
import { href } from "@/i18n/routes";
import { getServerSnapshot, getSnapshot, setConsent, subscribe } from "@/lib/consent";

export default function ConsentBanner({ locale, d }: { locale: Locale; d: Dict }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (consent !== "unset") return null;
  return (
    <div className="no-print fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-line bg-white p-5 shadow-xl" role="dialog" aria-label={d.consent.title}>
      <h2 className="text-base font-black text-brand-800">{d.consent.title}</h2>
      <p className="mt-2 text-sm leading-7 text-ink-700">{d.consent.text}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setConsent("accepted")} className="btn btn-primary">{d.consent.accept}</button>
        <button type="button" onClick={() => setConsent("refused")} className="btn btn-secondary">{d.consent.refuse}</button>
        <Link href={href(locale, "privacy")} className="ms-auto text-xs font-bold text-brand-700 underline">{d.consent.settings}</Link>
      </div>
    </div>
  );
}
