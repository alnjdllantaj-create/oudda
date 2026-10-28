/** مخزّن صغير لموافقة الإعلانات — useSyncExternalStore، بلا setState داخل effect. */
export const CONSENT_KEY = "oudda-ad-consent";
export type ConsentValue = "unknown" | "unset" | "accepted" | "refused";

let current: ConsentValue = "unknown";
const listeners = new Set<() => void>();

function read(): ConsentValue {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "refused" ? v : "unset";
  } catch { return "unset"; }
}
export function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}
export function getSnapshot(): ConsentValue {
  if (current === "unknown") current = read();
  return current;
}
export function getServerSnapshot(): ConsentValue { return "unknown"; }
export function setConsent(v: "accepted" | "refused"): void {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* private mode */ }
  current = v;
  listeners.forEach((l) => l());
}
