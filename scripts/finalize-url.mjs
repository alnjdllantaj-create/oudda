#!/usr/bin/env node
/**
 * يضبط canonical / hreflang / sitemap / robots على نسخة out/ مبنية مسبقًا،
 * بلا حاجة إلى Node أو إعادة بناء. الاستعمال:
 *   node scripts/finalize-url.mjs https://mon-site.pages.dev
 *   node scripts/finalize-url.mjs https://mondomaine.com --out /chemin/vers/out
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { LOCALES, PATHS, pagePath } from "./paths.mjs";

const args = process.argv.slice(2);
const siteArg = args.find((a) => !a.startsWith("--"));
const outFlag = args.indexOf("--out");
const OUT = outFlag >= 0 ? args[outFlag + 1] : "out";
const site = (siteArg ?? "").trim().replace(/\/+$/, "");

if (!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}$/i.test(site) || /example\.(com|org|net)|localhost/i.test(site)) {
  console.error("✗ أعطِ نطاقًا حقيقيًا يبدأ بـ https:// (مثال: https://oudda.pages.dev)");
  process.exit(2);
}

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
const files = walk(OUT).filter((f) => f.endsWith(".html"));
const skip = new Set(["404.html", "index.html", "_not-found/index.html", "404/index.html"]);
let patched = 0;

for (const f of files) {
  const rel = relative(OUT, f).split(sep).join("/");
  if (skip.has(rel)) continue;                       // صفحة اختيار اللغة و 404
  if (!/^(ar|fr)\//.test(rel)) continue;            // صفحات محلية فقط
  const url = site + "/" + rel.replace(/index\.html$/, "");
  let s = readFileSync(f, "utf8");
  // 1) hreflang rootdir -> مطلق
  s = s.replace(/(hrefLang="[a-zA-Z-]+"\s+href=")(\/[^"]*)(")/gi, (_m, a, b, c) => `${a}${site}${b}${c}`);
  // 2) canonical
  s = s.replace(/<link rel="canonical"[^>]*>/gi, "");
  s = s.replace("</head>", `<link rel="canonical" href="${url}"/><meta property="og:url" content="${url}"/></head>`);
  writeFileSync(f, s, "utf8");
  patched++;
}

// robots.txt
writeFileSync(join(OUT, "robots.txt"),
  `# Oudda / عدّة\nUser-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`, "utf8");

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const rows = LOCALES.flatMap((l) => PATHS.map((p) => {
  const u = site + pagePath(l, p);
  const ar = site + pagePath("ar", p), fr = site + pagePath("fr", p);
  return `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq>` +
    `<xhtml:link rel="alternate" hreflang="ar" href="${ar}"/>` +
    `<xhtml:link rel="alternate" hreflang="fr" href="${fr}"/>` +
    `<xhtml:link rel="alternate" hreflang="x-default" href="${ar}"/></url>`;
})).join("\n");
writeFileSync(join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Generated for ${site} -->\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rows}\n</urlset>\n`, "utf8");

console.log(`✓ ${patched} صفحة → canonical مطلق + og:url`);
console.log(`✓ hreflang مطلق، sitemap بـ ${LOCALES.length * PATHS.length} رابطًا، robots.txt → ${site}`);
console.log(`  المجلد: ${OUT} — ارفعه كما هو (أو أعد ضغطه).`);
