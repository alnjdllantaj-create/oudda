import test from "node:test";
import assert from "node:assert/strict";
import { extractVideoId, variantUrl, THUMBNAILS } from "../src/lib/youtube.ts";

const ID = "dQw4w9WgXcQ";
test("extractVideoId: bare 11-char id", () => assert.equal(extractVideoId(ID), ID));
test("extractVideoId: standard watch URL", () => assert.equal(extractVideoId(`https://www.youtube.com/watch?v=${ID}&t=10`), ID));
test("extractVideoId: youtu.be short link", () => assert.equal(extractVideoId(`https://youtu.be/${ID}`), ID));
test("extractVideoId: shorts, embed, live", () => {
  for (const p of ["shorts", "embed", "live"]) assert.equal(extractVideoId(`https://www.youtube.com/${p}/${ID}`), ID);
});
test("extractVideoId: mobile host and bare host", () => {
  assert.equal(extractVideoId(`m.youtube.com/watch?v=${ID}`), ID);
  assert.equal(extractVideoId(`youtube.com/watch?v=${ID}`), ID);
});
test("extractVideoId: rejects invalid input", () => {
  for (const x of ["", "abc", "https://example.com/video/123", "https://www.youtube.com/watch?v=short"]) assert.equal(extractVideoId(x), null);
});
test("variantUrl: uses the official public image CDN only", () => {
  assert.equal(variantUrl(ID, "maxresdefault"), `https://img.youtube.com/vi/${ID}/maxresdefault.jpg`);
  for (const v of THUMBNAILS) assert.ok(v.url(ID).startsWith(`https://img.youtube.com/vi/${ID}/`));
});
test("THUMBNAILS: maxres has fallback chain", () => {
  const m = THUMBNAILS.find((v) => v.key === "maxresdefault");
  assert.ok(m && m.fallbacks && m.fallbacks.length >= 1);
});
