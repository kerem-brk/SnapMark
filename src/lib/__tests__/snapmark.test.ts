import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { encodeShareData, decodeShareData, sanitizeConfig, isSafeImageUrl } from "../shareUtils";
import { computeDiff, computeLineDiff, computeSplitDiff } from "../diffUtils";
import { CardConfig } from "../../types";

describe("SnapMark - Share Utils", () => {
  it("encodeShareData and decodeShareData roundtrip UTF-8 data correctly", () => {
    const original = {
      title: "Türkçe Başlık 🚀 & Özel Karakterler",
      code: "const selam = 'Merhaba Dünya';",
      language: "typescript",
      padding: 32,
    };

    const encoded = encodeShareData(original);
    assert.ok(typeof encoded === "string", "Encoded result should be string");
    assert.ok(encoded.length > 0, "Encoded string should not be empty");

    const decoded = decodeShareData(encoded) as typeof original;
    assert.deepEqual(decoded, original, "Decoded object should match original");
  });

  it("decodeShareData returns null on invalid or malformed string", () => {
    assert.equal(decodeShareData(""), null);
    assert.equal(decodeShareData("not-a-valid-base64-or-json@@#$"), null);
    // @ts-expect-error Testing invalid input type
    assert.equal(decodeShareData(null), null);
  });

  it("sanitizeConfig strips invalid themes, languages and limits bounds", () => {
    const rawInput = {
      title: "Geçerli Başlık",
      code: "console.log('test');",
      language: "typescript",
      theme: "carbon",
      padding: 250, // Should be clamped to max 128
      fontSize: 5,   // Should be clamped to min 10
      windowStyle: "hacker-terminal-invalid", // Not allowed -> ignored
      maliciousField: "<script>alert('xss')</script>", // Not in schema
    };

    const sanitized = sanitizeConfig(rawInput);
    assert.equal(sanitized.title, "Geçerli Başlık");
    assert.equal(sanitized.code, "console.log('test');");
    assert.equal(sanitized.language, "typescript");
    assert.equal(sanitized.theme, "carbon");
    assert.equal(sanitized.padding, 128, "Padding should be clamped to 128");
    assert.equal(sanitized.fontSize, 10, "FontSize should be clamped to 10");
    assert.equal(sanitized.windowStyle, undefined, "Invalid windowStyle should be dropped");
    assert.equal((sanitized as Record<string, unknown>).maliciousField, undefined, "Unknown fields should be dropped");
  });

  it("sanitizeConfig handles empty and non-object inputs safely", () => {
    assert.deepEqual(sanitizeConfig(null), {});
    assert.deepEqual(sanitizeConfig(undefined), {});
    assert.deepEqual(sanitizeConfig("not-an-object"), {});
  });
});

describe("SnapMark - Diff Utils", () => {
  it("computeDiff correctly identifies added, removed, and unchanged lines", () => {
    const before = "const a = 1;\nconst b = 2;\nconst c = 3;";
    const after = "const a = 1;\nconst b = 20;\nconst c = 3;\nconst d = 4;";

    const diff = computeDiff(before, after);
    assert.ok(Array.isArray(diff), "Diff output should be an array");

    // Line 1 is unchanged
    const unchangedA = diff.find((d) => d.value === "const a = 1;");
    assert.ok(unchangedA && unchangedA.type === "unchanged");

    // Line 2 removed in before, added in after
    const removedB = diff.find((d) => d.value === "const b = 2;");
    assert.ok(removedB && removedB.type === "removed");

    const addedB = diff.find((d) => d.value === "const b = 20;");
    assert.ok(addedB && addedB.type === "added");

    // Line 4 added
    const addedD = diff.find((d) => d.value === "const d = 4;");
    assert.ok(addedD && addedD.type === "added");
  });

  it("computeLineDiff handles empty before or after string", () => {
    const emptyBefore = computeLineDiff("", "console.log('new');");
    assert.ok(emptyBefore.some((d) => d.type === "added" && d.value === "console.log('new');"));

    const emptyAfter = computeLineDiff("console.log('old');", "");
    assert.ok(emptyAfter.some((d) => d.type === "removed" && d.value === "console.log('old');"));
  });

  it("computeSplitDiff creates paired side-by-side rows", () => {
    const before = "line1\nline2";
    const after = "line1\nline2_modified";

    const split = computeSplitDiff(before, after);
    assert.ok(split.length >= 2, "Split diff should contain rows for line1 and modifications");

    assert.equal(split[0].before?.value, "line1");
    assert.equal(split[0].after?.value, "line1");
    assert.equal(split[0].before?.type, "unchanged");
  });
});

describe("SnapMark - isSafeImageUrl", () => {
  it("rejects CSS-injection and protocol-relative URLs", () => {
    assert.equal(isSafeImageUrl("//evil.com/x.png"), false);
    assert.equal(isSafeImageUrl("/\\evil.com/x.png"), false);
    assert.equal(isSafeImageUrl("/a.png);background:url(//evil.com"), false);
    assert.equal(isSafeImageUrl('/a.png"x'), false);
    assert.equal(isSafeImageUrl("/a b.png"), false);
  });

  it("still accepts data:image and built-in relative paths", () => {
    assert.equal(isSafeImageUrl("data:image/png;base64,iVBORw0KGgo="), true);
    assert.equal(isSafeImageUrl("/avatars/avatar-1.png"), true);
  });
});

describe("SnapMark - isSafeImageUrl built-in avatars", () => {
  it("accepts encoded SVG data URLs with spaces, quotes and parentheses", () => {
    assert.equal(isSafeImageUrl("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle fill='url(%23g1)'/%3E%3C/svg%3E"), true);
    assert.equal(isSafeImageUrl('data:image/png;base64,AAAA"x'), false);
  });
});
