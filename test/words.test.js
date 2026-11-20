import { describe, expect, it } from "vitest";
import words from "#src/words.js";

// AI was used to define boundary classes

describe("words", () => {
  describe("valid classes", () => {
    it("splits words separated by spaces", () => {
      expect(words("protein vanilla pudding")).toEqual(["protein", "vanilla", "pudding"]);
    });

    it("splits words separated by punctuation and ignores it", () => {
      expect(words("flour, eggs, sugar")).toEqual(["flour", "eggs", "sugar"]);
    });

    it("keeps words with non-ASCII characters intact", () => {
      expect(words("crème brûlée")).toEqual(["crème", "brûlée"]);
    });

    it("keeps a quantity and its unit together", () => {
      expect(words("cream cheese 200g")).toEqual(["cream", "cheese", "200g"]);
    });

    it("returns single word", () => {
      expect(words("pudding")).toEqual(["pudding"]);
    });

    it("returns a single character", () => {
      expect(words("b")).toEqual(["b"]);
    });

    // AI suggested this test case
    it("keeps hyphenated words together", () => {
      expect(words("wheat-free cookies")).toEqual(["wheat-free", "cookies"]);
    });

    // AI suggested this test case
    it("splits words using custom separator", () => {
      expect(words("flour, eggs & sugar", /[^, ]+/g)).toEqual(["flour", "eggs", "&", "sugar"]);
    });
  });

  describe("invalid classes", () => {
    it("returns an empty array if the input is empty string", () => {
      expect(words("")).toEqual([]);
    });

    it("returns an empty array if the input is whitespace", () => {
      expect(words("  ")).toEqual([]);
    });

    // AI suggested this test case
    it("returns an empty array if the separator matches nothing", () => {
      expect(words("cheese", /x/g)).toEqual([]);
    });
  });
});
