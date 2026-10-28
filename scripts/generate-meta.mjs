#!/usr/bin/env node
/** يولّد robots.txt و sitemap.xml داخل public/ من قائمة المسارات الفعلية. */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { LOCALES, PATHS } from "./paths.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, "");
const site = /^https?:\/\/.+\..+/.test(raw) ? raw : "";

const urls = site
  ? LOCALES.flatMap((l) => PATHS.map((p) => `${site}/${l}/${p ? p + "/" : ""}`))
  : [];
const today = new Date().toISOString().slice(0, 10);
const body =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<!-- ${site ? "Generated for " + site : "SITE_URL not configured: set NEXT_PUBLIC_SITE_URL and rebuild"}; ${PATHS.length} paths x ${LOCALES.length} locales -->\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  urls
    .map(
      (u) =>
        `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq>` +
        `<xhtml:link rel="alternate" hreflang="ar" href="${u.replace(/^\/(ar|fr)\//, "/ar/")}"/>` +
        `<xhtml:link rel="alternate" hreflang="fr" href="${u.replace(/^\/(ar|fr)\//, "/fr/")}"/>` +
        `<xhtml:link rel="alternate" hreflang="x-default" href="${u.replace(/^\/(ar|fr)\//, "/ar/")}"/></url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;
writeFileSync(resolve(root, "public/sitemap.xml"), body, "utf8");

const robots =
  `# Oudda / عدّة\nUser-agent: *\nAllow: /\n` +
  (site ? `Sitemap: ${site}/sitemap.xml\n` : `# Sitemap: ضبط NEXT_PUBLIC_SITE_URL ثم أعد البناء\n`);
writeFileSync(resolve(root, "public/robots.txt"), robots, "utf8");
console.log(`✓ robots.txt + sitemap.xml (${urls.length} URLs, site=${site || "not configured"})`);
