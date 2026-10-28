import test from "node:test";
import assert from "node:assert/strict";
import { countText } from "../src/lib/text.ts";

test("countText: empty input returns all zeros", () => {
  assert.deepEqual(countText(""), { words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingMinutes: 0 });
  assert.equal(countText("   \n  ").words, 0);
});
test("countText: Arabic words and punctuation", () => {
  const s = countText("مرحبا بالعالم. هذا اختبار!");
  assert.equal(s.words, 4);
  assert.equal(s.sentences, 2);
  assert.equal(s.paragraphs, 1);
});
test("countText: NBSP and multiple spaces are normalized", () => {
  const a = countText("كلمة\u00a0أخرى");
  const b = countText("كلمة أخرى");
  assert.equal(a.words, b.words);
  assert.equal(a.words, 2);
});
test("countText: charsNoSpaces ignores spaces", () => {
  const s = countText("a b c");
  assert.equal(s.chars, 5);
  assert.equal(s.charsNoSpaces, 3);
});
test("countText: paragraphs split on blank lines", () => {
  assert.equal(countText("واحد\n\nاثنان\n\nثلاثة").paragraphs, 3);
});
test("countText: reading time is at least 1 and scales", () => {
  assert.equal(countText("كلمة").readingMinutes, 1);
  const many = Array.from({ length: 450 }, () => "كلمة").join(" ");
  assert.equal(countText(many).readingMinutes, 3);
});
