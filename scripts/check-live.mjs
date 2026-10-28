#!/usr/bin/env node
/**
 * فحص حيّ للموقع المنشور — كيقرأ الموقع من برّه وكيكتب تقريراً.
 *   node scripts/check-live.mjs            → تقرير مفصّل
 *   node scripts/check-live.mjs --quiet    → سطر واحد للـ monitor
 */
import { writeFileSync, appendFileSync } from "node:fs";

const BASE = (process.env.OUDDA_URL ?? "https://oudda-content.netlify.app").replace(/\/+$/, "");
const quiet = process.argv.includes("--quiet");
const PATHS = ["/", "/ar/", "/fr/", "/ar/tools/", "/fr/tools/", "/ar/guides/", "/fr/guides/",
  "/ar/templates/", "/fr/templates/", "/ar/about/", "/fr/privacy/", "/ar/contact/",
  "/fr/contact/", "/ar/tools/qr-generator/", "/fr/guides/qr-print/", "/404.html",
  "/icon.svg", "/ads.txt", "/robots.txt", "/sitemap.xml"];

const get = async (p) => {
  const r = await fetch(BASE + p, { redirect: "follow" });
  return { status: r.status, text: await r.text(), headers: r.headers };
};
const out = { checkedAt: new Date().toISOString(), base: BASE, paths: {}, checks: {}, failures: [] };
const ok = (name, cond, detail = "") => {
  out.checks[name] = { pass: !!cond, detail };
  if (!cond) out.failures.push(name + (detail ? ` (${detail})` : ""));
};

try {
  for (const p of PATHS) {
    try { const r = await get(p); out.paths[p] = r.status; ok(`status ${p}`, r.status === 200, String(r.status)); }
    catch (e) { out.paths[p] = "ERR"; ok(`status ${p}`, false, e.message); }
  }
  const ar = await get("/ar/"), fr = await get("/fr/");
  const arc = await get("/ar/contact/"), frc = await get("/fr/contact/");
  const sm = await get("/sitemap.xml"), rb = await get("/robots.txt"), ads = await get("/ads.txt");
  const home = await get("/");
  const cssHref = (ar.text.match(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/) ?? [])[1];
  const jsSrc = (ar.text.match(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/) ?? [])[1];
  out.paths["CSS"] = cssHref ? (await get(cssHref)).status : "missing";
  out.paths["JS"] = jsSrc ? (await get(jsSrc)).status : "missing";
  out.paths["/out/ar/ → /ar/"] = (await get("/out/ar/")).status;

  ok("canonical مطلق", /<link rel="canonical" href="https:\/\/oudda-content\.netlify\.app\/ar\/"/.test(ar.text));
  ok("hreflang ar/fr", ar.text.includes('hrefLang="ar"') && ar.text.includes('hrefLang="fr"'));
  ok("mailto عربي", arc.text.includes("mailto:alnjdllantaj@gmail.com"));
  ok("mailto فرنسي", frc.text.includes("mailto:alnjdllantaj@gmail.com"));
  ok("sitemap 68 رابط", (sm.text.match(/<loc>/g) ?? []).length === 68, String((sm.text.match(/<loc>/g) ?? []).length));
  ok("robots سطر Sitemap", rb.text.includes("Sitemap: " + BASE + "/sitemap.xml"));
  ok("ads.txt بلا pub", !/^google\.com,/m.test(ads.text));
  ok("CSS شغّال", out.paths["CSS"] === 200);
  ok("JS شغّال", out.paths["JS"] === 200);
  ok("إعادة توجيه /out/", out.paths["/out/ar/ → /ar/"] === 200);
  ok("HSTS", (ar.headers.get("strict-transport-security") ?? "").includes("max-age"));
  ok("nosniff", ar.headers.get("x-content-type-options") === "nosniff");
  const bad = ["pagead2", "adsbygoogle", "googletagmanager", "google-analytics", "example.com", "localhost", "api.qrserver.com"];
  ok("بلا سكربتات/نطاقات ممنوعة", bad.every((t) => !ar.text.toLowerCase().includes(t)));
  ok("الرئيسية تختار اللغة", home.text.includes('href="/ar/"') && home.text.includes('href="/fr/"'));
  ok("JSON-LD", ar.text.includes("application/ld+json"));
} catch (e) { out.failures.push("استثناء: " + e.message); }

out.summary = { total: Object.keys(out.checks).length,
  passed: Object.values(out.checks).filter((c) => c.pass).length, failed: out.failures.length };

writeFileSync("/home/user/oudda-HEALTH.json", JSON.stringify(out, null, 2), "utf8");
const md = [
  `# صحة الموقع — ${out.summary.passed}/${out.summary.total} فحص ناجح`,
  ``,
  `🕐 ${out.checkedAt}`,
  `🔗 ${BASE}`,
  ``,
  out.summary.failed === 0 ? `✅ **كلشي خدّام.**` : `❌ مشاكل: ${out.failures.join(" · ")}`,
  ``,
  "| الفحص | الحالة |", "|---|---|",
  ...Object.entries(out.checks).map(([k, v]) => `| ${k} | ${v.pass ? "✅" : "❌ " + v.detail} |`),
];
writeFileSync("/home/user/oudda-HEALTH-LATEST.md", md.join("\n") + "\n", "utf8");
appendFileSync("/home/user/oudda-HEALTH.log",
  `${out.checkedAt}  ${out.summary.passed}/${out.summary.total}  ${out.summary.failed === 0 ? "OK" : "FAIL: " + out.failures.join("; ")}\n`, "utf8");

if (quiet) console.log(`${out.checkedAt}  ${out.summary.passed}/${out.summary.total}  ${out.summary.failed === 0 ? "OK" : "FAIL"}`);
else { console.log(md.join("\n")); console.log(`\n📄 /home/user/oudda-HEALTH-LATEST.md`); }
process.exit(out.summary.failed === 0 ? 0 : 1);
