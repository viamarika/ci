import { describe, expect, it, vi } from "vitest";
import chunk from "#src/chunk.js";

// AI was used to define boundary classes

vi.mock("#src/toInteger.js", () => ({
  default: (val) => Math.trunc(val),
}));

vi.mock("#src/slice.js", () => ({
  default: (array, start, end) => array.slice(start, end),
}));

describe("chunk", () => {
  describe("valid classes", () => {
    it("does not split the results if array is empty", () => {
      expect(chunk([], 2)).toEqual([]);
    });

    it("does not split the results if array has one item", () => {
      expect(chunk(["cookies"], 2)).toEqual([["cookies"]]);
    });

    it("gives each item its own page with valid size as 1", () => {
      expect(chunk(["cookies", "orange", "milk"], 1)).toEqual([["cookies"], ["orange"], ["milk"]]);
    });

    it("splits page evenly", () => {
      expect(chunk(["cookies", "water", "apple", "flour"], 2)).toEqual([
        ["cookies", "water"],
        ["apple", "flour"],
      ]);
    });

    it("fits all items on one page when they match the size", () => {
      expect(chunk(["cookies", "water"], 2)).toEqual([["cookies", "water"]]);
    });

    it("splits page with uneven results", () => {
      expect(chunk(["cookies", "water", "apple"], 2)).toEqual([["cookies", "water"], ["apple"]]);
    });

    it("splits page with the default value", () => {
      expect(chunk(["cookies", "orange", "milk"])).toEqual([["cookies"], ["orange"], ["milk"]]);
    });
  });

  describe("invalid classes", () => {
    it("throws an error when the page size is 0", () => {
      expect(() => chunk(["cookies", "orange", "milk"], 0)).toThrow();
    });

    it("throws an error when the page size is negative", () => {
      expect(() => chunk(["cookies", "orange", "milk"], -1)).toThrow();
    });

    it("throws an error when the page size is a decimal", () => {
      expect(() => chunk(["cookies", "orange", "milk"], 2.24)).toThrow();
    });
  });
});
