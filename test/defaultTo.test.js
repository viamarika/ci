import { describe, expect, it } from "vitest";
import defaultTo from "#src/defaultTo.js";

// AI was used to define boundary classes

describe("defaultTo", () => {
  describe("valid classes", () => {
    it("returns a value when a value is given", () => {
      expect(defaultTo(3, 1)).toEqual(3);
    });

    it("returns 0 instead of default value", () => {
      expect(defaultTo(0, 1)).toEqual(0);
    });

    it("returns false instead of default value", () => {
      expect(defaultTo(false, true)).toEqual(false);
    });

    it("returns an empty string instead of default value", () => {
      expect(defaultTo("", "No description")).toEqual("");
    });

    it("returns an empty array instead of default value", () => {
      expect(defaultTo([], ["Unknown"])).toEqual([]);
    });
  });

  describe("invalid classes", () => {
    it("returns default value when the value is undefined", () => {
      expect(defaultTo(undefined, "No description")).toEqual("No description");
    });

    it("returns default value when the value is null", () => {
      expect(defaultTo(null, "No description")).toEqual("No description");
    });

    it("returns default value when the value is NaN", () => {
      expect(defaultTo(NaN, "No description")).toEqual("No description");
    });
  });
});
