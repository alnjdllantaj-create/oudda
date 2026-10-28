#!/usr/bin/env node
/** فحص شامل للموقع المُصدَّر في out/ — لا يحتاج خادمًا ولا اتصالًا بالشبكة. */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, PATHS, TOOL_SLUGS, GUIDE_SLUGS, TEMPLATE_SLUGS, LEGAL_SLUGS, htmlFile } from "./paths.mjs";

let pass = 0, fail = 0;
const ok = (name, condition, detail = "") => {
  if (condition) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? " — " + detail : ""}`); }
};
const read = (p) => readFileSync(p, "utf8");
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/&[#a-z0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
const words = (html) => text(html).split(" ").filter(Boolean).length;

const envSite = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, "");
const adsense = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "").trim();
// يكتشف النطاق من canonical نفسه (مهم بعد scripts/finalize-url.mjs حين لا يكون المتغيّر مضبوطًا).
const peek = existsSync("out/ar/index.html") ? read("out/ar/index.html") : "";
const canonicalMatch = peek.match(/<link rel="canonical" href="(https?:\/\/[^/]+)\/ar\/"/);
const site = envSite || (canonicalMatch ? canonicalMatch[1] : "");
console.log(`\n=== Oudda / عدّة — static site verification ===`);
console.log(`    NEXT_PUBLIC_SITE_URL = ${envSite || "(not set)"}`);
console.log(`    effective site       = ${site || "(none — no canonical emitted)"}`);
console.log(`    NEXT_PUBLIC_ADSENSE_CLIENT = ${adsense || "(not set)"}\n`);

console.log("[1] Static files");
ok("out/ directory exists", existsSync("out"));
for (const f of ["index.html", "404.html", "icon.svg", "ads.txt", "robots.txt", "sitemap.xml"]) ok(`out/${f}`, existsSync(`out/${f}`));
const htmls = walk("out").filter((f) => f.endsWith(".html"));
ok("at least 70 static HTML pages", htmls.length >= 70, `found ${htmls.length}`);
ok("72 routes generated (68 localized + root/404/…)", htmls.length === 72, `found ${htmls.length}`);

console.log("[2] Every declared route is a real HTML file");
let missing = [];
for (const l of LOCALES) for (const p of PATHS) if (!existsSync(htmlFile(l, p))) missing.push(`${l}/${p}`);
ok(`${LOCALES.length * PATHS.length} localized pages exist`, missing.length === 0, missing.slice(0, 6).join(", "));
ok("5 tool pages × 2 languages", TOOL_SLUGS.length === 5 && LOCALES.every((l) => TOOL_SLUGS.every((s) => existsSync(htmlFile(l, `tools/${s}`)))));
ok("12 guide pages × 2 languages", GUIDE_SLUGS.length === 12 && LOCALES.every((l) => GUIDE_SLUGS.every((s) => existsSync(htmlFile(l, `guides/${s}`)))));
ok("8 template pages × 2 languages", TEMPLATE_SLUGS.length === 8 && LOCALES.every((l) => TEMPLATE_SLUGS.every((s) => existsSync(htmlFile(l, `templates/${s}`)))));
ok("5 trust pages × 2 languages", LEGAL_SLUGS.length === 5 && LOCALES.every((l) => LEGAL_SLUGS.every((s) => existsSync(htmlFile(l, s)))));

console.log("[3] SEO metadata, hreflang and canonical policy");
const arHome = read("out/ar/index.html"), frHome = read("out/fr/index.html");
ok("hreflang ar/fr links present on ar home", /hreflang="ar"/i.test(arHome) && /hreflang="fr"/i.test(arHome));
ok("hreflang ar/fr links present on fr home", /hreflang="ar"/i.test(frHome) && /hreflang="fr"/i.test(frHome));
ok("JSON-LD present on home", arHome.includes('application/ld+json'));
ok("FAQPage JSON-LD present on home", arHome.includes("FAQPage"));
ok("WebSite JSON-LD present on home", arHome.includes("WebSite"));
ok("Article JSON-LD on a guide page", read("out/ar/guides/qr-print/index.html").includes("Article"));
ok("BreadcrumbList JSON-LD on a tool page", read("out/ar/tools/qr-generator/index.html").includes("BreadcrumbList"));
ok("ar pages declare lang/dir on the shell", /<html lang="ar" dir="rtl">/.test(arHome));
ok("fr pages carry lang=fr dir=ltr in the body", frHome.includes('lang="fr"') && frHome.includes('dir="ltr"'));
ok("robots.txt allows crawling", read("out/robots.txt").includes("Allow: /"));
ok("out/.nojekyll present (GitHub Pages _next fix)", existsSync("out/.nojekyll"));
if (site) {
  ok("canonical is absolute and uses the configured domain", arHome.includes(`rel="canonical" href="${site}/ar/"`), "check buildMetadata");
  ok("sitemap contains 68 absolute URLs", (read("out/sitemap.xml").match(/<loc>/g) ?? []).length === LOCALES.length * PATHS.length);
  ok("robots.txt points at the sitemap", read("out/robots.txt").includes(`Sitemap: ${site}/sitemap.xml`));
} else {
  ok("no canonical emitted without a real domain", !/rel="canonical"/.test(arHome));
  ok("sitemap is empty but valid XML", read("out/sitemap.xml").includes("<urlset") && !(read("out/sitemap.xml").match(/<loc>/g) ?? []).length);
}

console.log("[4] No fake domains, tracking or external assets in output");
const allHtml = htmls.map((f) => [f, read(f)]);
const bad = (re) => allHtml.filter(([, s]) => re.test(s)).map(([f]) => f);
ok("no example.com anywhere in HTML", bad(/example\.com/i).length === 0, bad(/example\.com/i).slice(0, 3).join(", "));
ok("no localhost anywhere in HTML", bad(/localhost/i).length === 0, bad(/localhost/i).slice(0, 3).join(", "));
ok("no external QR API", bad(/api\.qrserver\.com|goqr\.me|qrserver/i).length === 0);
ok("no OpenAI / paid API references", bad(/openai|chatgpt|api[_-]?key/i).length === 0);
ok("no analytics / tag manager", bad(/google-analytics|googletagmanager|gtag\(|analytics\.js/i).length === 0);
ok("no external fonts", bad(/fonts\.googleapis|fonts\.gstatic|@font-face/i).length === 0);
ok("no external scripts (AdSense is opt-in and not set)", adsense ? true : bad(/<script[^>]+src="https?:\/\//i).length === 0);
ok("no pagead script when AdSense client is unset", !adsense ? !allHtml.some(([, s]) => s.includes("pagead2.googlesyndication")) : true);
ok("no adsbygoogle <ins> rendered without consent", !allHtml.some(([, s]) => s.includes('class="adsbygoogle')));
const adsLines = read("out/ads.txt").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
ok("ads.txt has placeholder comments only", adsLines.length === 0, adsLines.join(" | "));
ok("ads.txt mentions no publisher id in active lines", !/pub-\d/.test(adsLines.join(" ")));

console.log("[5] Original, substantive content on every editorial page");
const minWords = { "tools/": 700, "guides/": 600, "templates/": 250, "": 450 };
let thin = [];
for (const l of LOCALES) {
  for (const p of PATHS) {
    const key = p.startsWith("tools/") ? "tools/" : p.startsWith("guides/") ? "guides/" : p.startsWith("templates/") ? "templates/" : "";
    const limit = p === "" ? 450 : ["tools", "guides", "templates"].includes(p) ? 180 : key ? minWords[key] : 400;
    const w = words(read(htmlFile(l, p)));
    if (w < limit) thin.push(`${l}/${p} (${w} < ${limit})`);
  }
}
ok("no thin pages (word-count thresholds)", thin.length === 0, thin.slice(0, 8).join(" | "));
const minTool = Math.min(...LOCALES.flatMap((l) => TOOL_SLUGS.map((s) => words(read(htmlFile(l, `tools/${s}`))))));
const minGuide = Math.min(...LOCALES.flatMap((l) => GUIDE_SLUGS.map((s) => words(read(htmlFile(l, `guides/${s}`))))));
console.log(`    · shortest tool page: ${minTool} words · shortest guide page: ${minGuide} words`);

console.log("[6] Internal links all resolve to real exported files");
const valid = new Set();
for (const l of LOCALES) for (const p of PATHS) valid.add(`/${l}/${p ? p + "/" : ""}`);
valid.add("/");
const broken = new Set();
for (const [f, s] of allHtml) {
  for (const m of s.matchAll(/href="(\/[^"#?]*)"/g)) {
    let u = m[1];
    if (u.startsWith("/_next/") || u === "/icon.svg" || u.endsWith(".txt") || u.endsWith(".xml") || u.endsWith(".svg")) continue;
    if (!u.endsWith("/")) u += "/";
    if (!valid.has(u)) broken.add(`${f} -> ${u}`);
  }
}
ok("no broken internal links", broken.size === 0, [...broken].slice(0, 8).join(" | "));

console.log("[7] Client-side-only tools: source-level safety");
const srcFiles = walk("src").filter((f) => /\.(ts|tsx)$/.test(f));
const pwSrc = read("src/lib/password.ts") + read("src/components/tools/PasswordGenerator.tsx");
ok("no insecure randomness in password code", !pwSrc.includes("Math.random"));
ok("password code uses Web Crypto", pwSrc.includes("crypto.getRandomValues"));
const toolSrc = walk("src/components/tools").filter((f) => f.endsWith(".tsx")).map(read).join("\n");
ok("no fetch() in any tool component", !toolSrc.includes("fetch("));
ok("no API keys or paid endpoints in source", !srcFiles.map(read).join("\n").match(/sk-[A-Za-z0-9]{10,}|api[_-]?key\s*[:=]\s*["'][^"']+/i));
ok("no Math.random anywhere in src", !srcFiles.map(read).join("\n").includes("Math.random"));
ok("hashtag dataset is a static JSON file", existsSync("src/content/hashtags.json"));
ok("QR tool imports qrcode.react", read("src/components/tools/QrGenerator.tsx").includes("qrcode.react"));
ok("YouTube tool uses only the public image CDN", read("src/lib/youtube.ts").includes("img.youtube.com/vi/"));
ok("no canvas download of third-party thumbnails", !toolSrc.includes("toDataURL(") || !read("src/components/tools/YoutubeThumbnail.tsx").includes("toDataURL("));

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===\n`);
process.exit(fail === 0 ? 0 : 1);
