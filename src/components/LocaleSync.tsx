"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** يضبط lang/dir على <html> حسب اللغة (الجذر ثابت لأسباب التوافق مع التصدير الثابت). */
export default function LocaleSync() {
  const pathname = usePathname();
  useEffect(() => {
    const locale = pathname.split("/").filter(Boolean)[0] === "fr" ? "fr" : "ar";
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [pathname]);
  return null;
}
