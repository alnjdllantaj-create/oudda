#!/usr/bin/env node
/**
 * رفع مباشر على Netlify عبر الـ API — يستعمله المساعد بعد ما يعطيه المستخدم توكن مؤقت.
 *
 *   NETLIFY_AUTH_TOKEN=xxxx node scripts/netlify-deploy.mjs [site.zip] [site-id-or-domain]
 *
 * ملاحظات أمان:
 *  - التوكن كيبقى فالذاكرة فقط؛ ما كيتكتب فحتى ملف داخل /home/user.
 *  - المستخدم خاصو يمسح التوكن من Netlify من بعد ما كنكمّلو.
 *  - يمكن استعمال نطاق الموقع كـ site_id مباشرة (مثال: oudda-content.netlify.app).
 */
import { readFileSync, statSync } from "node:fs";
import { resolve, basename } from "node:path";

const token = (process.env.NETLIFY_AUTH_TOKEN ?? "").trim();
const zipPath = resolve(process.argv[2] ?? "/home/user/oudda-FINAL-netlify.zip");
const site = (process.env.NETLIFY_SITE_ID ?? process.argv[3] ?? "oudda-content.netlify.app").trim();
const PUBLIC = `https://${site.replace(/\.netlify\.app$/, "")}.netlify.app`;

if (!token) { console.error("✗ NETLIFY_AUTH_TOKEN غير مضبوط."); process.exit(2); }
if (!zipPath.endsWith(".zip")) { console.error("✗ خاص الملف يكون .zip"); process.exit(2); }

const zip = readFileSync(zipPath);
const H = { Authorization: `Bearer ${token}`, "User-Agent": "Oudda-Deploy/1.0" };
console.log(`📦 ${basename(zipPath)} — ${(statSync(zipPath).size / 1048576).toFixed(2)} MiB`);
console.log(`🌐 ${site}`);

// 1) تأكد من صلاحية التوكن + وجود الموقع
const infoRes = await fetch(`https://api.netlify.com/api/v1/sites/${encodeURIComponent(site)}`, { headers: H });
if (!infoRes.ok) {
  console.error(`✗ التوكن ماشي صالح ولا الموقع ما كاين: ${infoRes.status} ${await infoRes.text()}`);
  process.exit(1);
}
const info = await infoRes.json();
console.log(`   site_id = ${info.id} | name = ${info.name} | url = ${info.ssl_url ?? info.url}`);

// 2) ارفع الـ ZIP
console.log("⬆️  جاري الرفع...");
const res = await fetch(`https://api.netlify.com/api/v1/sites/${encodeURIComponent(info.id)}/deploys`, {
  method: "POST",
  headers: { ...H, "Content-Type": "application/zip", "Content-Length": String(zip.length) },
  body: zip,
});
const data = await res.json().catch(() => ({}));
if (!res.ok) { console.error(`✗ فشل الرفع: ${res.status} ${JSON.stringify(data)}`); process.exit(1); }
console.log(`✅ deploy ${data.id} — state: ${data.state}`);

// 3) ستنى حتى يولّي ready
const deployId = data.id;
let state = data.state;
for (let i = 0; i < 40 && state !== "ready" && state !== "error"; i++) {
  await new Promise((r) => setTimeout(r, 3000));
  const p = await fetch(`https://api.netlify.com/api/v1/deploys/${deployId}`, { headers: H });
  const d = await p.json().catch(() => ({}));
  state = d.state ?? state;
  if (i % 4 === 0) console.log(`   … ${state}`);
}
console.log(`   الحالة النهائية: ${state}`);
if (state === "error") { console.error("✗ النشر فشل فـ post-processing."); process.exit(1); }

// 4) فحص مباشر من برّه
console.log("\n🔍 فحص الموقع المنشور:");
for (const path of ["/", "/ar/", "/fr/", "/ar/contact/", "/fr/contact/", "/sitemap.xml", "/robots.txt", "/ads.txt"]) {
  try {
    const r = await fetch(`${PUBLIC}${path}`, { redirect: "follow" });
    console.log(`   ${r.status}  ${path}`);
  } catch (e) { console.log(`   ERR ${path} — ${e.message}`); }
}
const contact = await (await fetch(`${PUBLIC}/ar/contact/`)).text();
const ar = await (await fetch(`${PUBLIC}/ar/`)).text();
const sm = await (await fetch(`${PUBLIC}/sitemap.xml`)).text();
console.log(`   mailto present      : ${contact.includes("mailto:")}`);
console.log(`   canonical present   : ${ar.includes('rel="canonical"')}`);
console.log(`   sitemap <loc> count : ${(sm.match(/<loc>/g) ?? []).length}`);
console.log(`\n🎉 ${PUBLIC}/`);
