import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { detectTopics, generateHashtags, normalizeTag } from "../src/lib/hashtags.ts";

const data = JSON.parse(readFileSync(new URL("../src/content/hashtags.json", import.meta.url), "utf8"));
test("dataset is static, versioned and has no API keys", () => {
  assert.equal(data.version, 1);
  assert.ok(data.topics.length >= 10);
  assert.ok(Object.keys(data.platforms).length >= 4);
  const raw = JSON.stringify(data);
  assert.equal(/api[_-]?key|secret|token|https?:\/\//i.test(raw), false);
});
test("normalizeTag: strips symbols, spaces and duplicate hashes", () => {
  assert.equal(normalizeTag("  ##طبخ رائع!  "), "#طبخرائع");
  assert.equal(normalizeTag("food & travel"), "#foodtravel");
  assert.equal(normalizeTag("!!!"), "");
});
test("detectTopics: matches Arabic and French keywords", () => {
  assert.ok(detectTopics(data, "وصفة طبخ").includes("food"));
  assert.ok(detectTopics(data, "voyage").includes("travel"));
  assert.deepEqual(detectTopics(data, ""), []);
});
test("generateHashtags: 30 unique valid tags for every platform and language", () => {
  for (const platform of ["instagram", "tiktok", "youtube", "general"]) {
    for (const language of ["ar", "fr"]) {
      const tags = generateHashtags(data, { keyword: "وصفة طبخ", platform, language });
      assert.equal(tags.length, 30, `platform=${platform} lang=${language}`);
      assert.equal(new Set(tags.map((t) => t.toLowerCase())).size, 30);
      for (const tag of tags) assert.match(tag, /^#[\p{L}\p{N}_]+$/u);
    }
  }
});
test("generateHashtags: unknown keyword still yields 30 tags", () => {
  const tags = generateHashtags(data, { keyword: "zzzzqqq", platform: "tiktok", language: "ar" });
  assert.equal(tags.length, 30);
  assert.equal(tags[0], "#zzzzqqq");
});
test("generateHashtags: empty keyword falls back to platform tags", () => {
  const tags = generateHashtags(data, { keyword: "", platform: "instagram", language: "fr" });
  assert.equal(tags.length, 30);
  assert.ok(tags.includes("#instagram"));
});
