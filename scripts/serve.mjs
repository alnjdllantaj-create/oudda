#!/usr/bin/env node
/** خادم ثابت بسيط لمجلد out/ بعد npm run build (للمعاينة المحلية فقط). */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.env.PORT ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".webmanifest": "application/manifest+json",
};
createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const full = join(root, normalize(p).replace(/^(\.\.[/\\])+/, ""));
    if (!full.startsWith(root)) { res.writeHead(403).end("Forbidden"); return; }
    const s = await stat(full).catch(() => null);
    const file = s?.isDirectory() ? join(full, "index.html") : full;
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream", "X-Content-Type-Options": "nosniff" });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("404 — الصفحة غير موجودة");
  }
}).listen(port, "0.0.0.0", () => console.log(`Oudda ready on http://0.0.0.0:${port}`));
