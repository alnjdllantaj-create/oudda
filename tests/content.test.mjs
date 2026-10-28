import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
const files = ["src/content/tools.ts", "src/content/guides.ts", "src/content/templates.ts", "src/content/legal.ts", "src/i18n/dict.ts"];

test("no CJK characters leaked into the Arabic/French content", () => {
  for (const f of files) assert.equal(/[\u4e00-\u9fff]/.test(read(f)), false, f);
});
test("no stray assistant artifacts", () => {
  for (const f of files) {
    const s = read(f);
    for (const token of ["ChatGPT", "OpenAI API", "https://api.qrserver.com", "fetch(", "example.com", "localhost"]) {
      assert.equal(s.includes(token), false, `${f} contains ${token}`);
    }
  }
});
test("brace balance is zero in all source TS/TSX files", () => {
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(dir, e.name)) : /\.(ts|tsx)$/.test(e.name) ? [join(dir, e.name)] : []);
  for (const f of walk(fileURLToPath(new URL("../src", import.meta.url)))) {
    const s = readFileSync(f, "utf8");
    let a = 0, b = 0;
    for (const ch of s) { if (ch === "{") a++; if (ch === "}") a--; if (ch === "[") b++; if (ch === "]") b--; }
    assert.equal(a, 0, `${f} brace balance`);
    assert.equal(b, 0, `${f} bracket balance`);
  }
});
test("content files declare the required volumes", () => {
  assert.equal((read("src/content/tools.ts").match(/^const \w+(Ar|Fr): ToolDoc/gm) ?? []).length, 10);
  assert.equal((read("src/content/templates.ts").match(/slug: "/g) ?? []).length, 16);
  const g = read("src/content/guides.ts");
  assert.equal((g.match(/^    slug: "/gm) ?? []).length, 24);
});
