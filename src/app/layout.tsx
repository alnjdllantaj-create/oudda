import type { Metadata } from "next";
import "./globals.css";
import LocaleSync from "@/components/LocaleSync";

export const metadata: Metadata = {
  title: { default: "عُدّة | Oudda", template: "%s — عُدّة | Oudda" },
  description: "أدوات وقوالب مجانية لصانع المحتوى العربي، تعمل داخل متصفحك. Outils et modèles gratuits pour les créateurs de contenu.",
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
  verification: { google: "NByRYnyHjyCHrdrDy8i_Q1P0rzZ2_0qa9ogJS8Bi7hA" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LocaleSync />
        {children}
      </body>
    </html>
  );
}
