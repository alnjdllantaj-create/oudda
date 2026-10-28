import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { charsetFor, entropyBits, generatePassword, strengthLabel } from "../src/lib/password.ts";

const base = { length: 16, upper: true, lower: true, digits: true, symbols: true };
test("generatePassword: respects requested length", () => {
  for (const len of [8, 12, 20, 50]) assert.equal(generatePassword({ ...base, length: len }).length, len);
});
test("generatePassword: clamps out-of-range lengths", () => {
  assert.equal(generatePassword({ ...base, length: 2 }).length, 8);
  assert.equal(generatePassword({ ...base, length: 999 }).length, 50);
});
test("generatePassword: includes at least one char of every enabled set", () => {
  for (let i = 0; i < 30; i++) {
    const pw = generatePassword({ ...base, length: 8 });
    assert.match(pw, /[A-HJ-NP-Z]/);
    assert.match(pw, /[a-km-z]/);
    assert.match(pw, /[2-9]/);
    assert.match(pw, /[!@#$%^&*()\-_=+\[\]{};:,.?]/);
  }
});
test("generatePassword: never emits characters from disabled sets", () => {
  const pw = generatePassword({ length: 40, upper: false, lower: true, digits: true, symbols: false });
  assert.match(pw, /^[a-z2-9]+$/);
});
test("generatePassword: returns empty string when no charset is active", () => {
  assert.equal(generatePassword({ length: 16, upper: false, lower: false, digits: false, symbols: false }), "");
  assert.equal(charsetFor({ length: 16, upper: false, lower: false, digits: false, symbols: false }), "");
});
test("generatePassword: produces different values (no fixed seed)", () => {
  const set = new Set(Array.from({ length: 20 }, () => generatePassword(base)));
  assert.equal(set.size, 20);
});
test("entropyBits / strengthLabel thresholds", () => {
  assert.equal(entropyBits(16, 1), 0);
  assert.ok(entropyBits(16, 26) < 80);
  assert.equal(strengthLabel(40), "weak");
  assert.equal(strengthLabel(60), "medium");
  assert.equal(strengthLabel(100), "strong");
});
test("security: no insecure randomness anywhere in password code", () => {
  for (const file of ["src/lib/password.ts", "src/components/tools/PasswordGenerator.tsx"]) {
    const src = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.equal(src.includes("Math.random"), false, `${file} must not use insecure randomness`);
    assert.equal(src.includes("fetch("), false, `${file} must not send data anywhere`);
  }
  assert.equal(readFileSync(new URL("../src/lib/password.ts", import.meta.url), "utf8").includes("crypto.getRandomValues"), true);
  assert.equal(readFileSync(new URL("../src/components/tools/PasswordGenerator.tsx", import.meta.url), "utf8").includes("generatePassword"), true);
});
