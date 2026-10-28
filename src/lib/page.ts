import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/dict";

export async function readLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function readSlug<S extends string>(
  params: Promise<{ locale: string; slug: string }>,
  allowed: readonly S[],
): Promise<{ locale: Locale; slug: S }> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !allowed.includes(slug as S)) notFound();
  return { locale, slug: slug as S };
}
