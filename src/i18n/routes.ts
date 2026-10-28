import type { Locale } from "./dict";

/** يبني مسارًا محليًا مع شرطة مائلة في النهاية (متوافق مع Static Export). */
export function href(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return `/${locale}/${clean ? clean + "/" : ""}`;
}

/** يبدّل اللغة مع الحفاظ على المسار النسبي. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "ar" || parts[0] === "fr") parts.shift();
  return `/${to}/${parts.length ? parts.join("/") + "/" : ""}`;
}
