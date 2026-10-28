"use client";
import { useEffect, useSyncExternalStore } from "react";
import type { Dict } from "@/i18n/dict";
import { getServerSnapshot, getSnapshot, subscribe } from "@/lib/consent";

/** لا يُحمّل أي سكربت إلا بوجود معرّف ناشر حقيقي + موافقة الزائر. */
export default function AdSlot({ d, slot = "top" }: { d: Dict; slot?: string }) {
  const client = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "").trim();
  const configured = /^ca-pub-\d{10,}$/.test(client);
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const allowed = configured && consent === "accepted";

  useEffect(() => {
    if (!allowed) return;
    const id = "adsbygoogle-js";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    }
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch { /* blocked by an extension — safe to ignore */ }
  }, [allowed, client]);

  return (
    <aside className="no-print my-8" aria-label={d.ad.label}>
      <div className="rounded-2xl border border-dashed border-line bg-white/60 p-4 text-center">
        {allowed ? (
          <ins className="adsbygoogle block w-full" style={{ display: "block", minHeight: 90 }} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
        ) : (
          <div className="min-h-[90px] content-center text-xs text-ink-300">{d.ad.label} · {d.ad.note}</div>
        )}
      </div>
    </aside>
  );
}
