import { describe, expect, it, vi } from "vitest";
import add from "#src/add.js";
import reduce from "#src/reduce.js";

// Tests tagged [Phase 1 plan] were designed in the Phase 1 test plan.
// Test with no tag was added later on.
// Tests in the [AI-generated] suite were created using Claude Code with the Opus 5.5 model.
// The only change was moving makeAdd inside the [AI-generated] block.

describe("reduce", () => {
  describe("valid classes", () => {
    it("[Phase 1 plan] sums the prices in the cart starting from 0", () => {
      expect(reduce([1, 2, 3], add, 0)).toBe(6);
    });

    it("[Phase 1 plan] sums the prices in the cart starting from a non-zero initial value", () => {
      expect(reduce([20, 3, 50], add, 100)).toBe(173);
    });

    it("sums the prices when the cart is an object", () => {
      expect(reduce({ cheese: 5, bread: 2, milk: 3 }, add, 0)).toBe(10);
    });
  });

  describe("invalid classes", () => {
    const isPositiveNum = (augend, addend) => augend + addend > 0;

    it("[Phase 1 plan] throws an error with negative prices", () => {
      expect(() => reduce([-1, -2, -4], add, 0)).toThrow();
    });

    it("[Phase 1 plan] throws an error if function returns true", () => {
      expect(() => reduce([1, 2, 3], isPositiveNum, 0)).toThrow();
    });

    it("[Phase 1 plan] throws an error if starting value is negative", () => {
      expect(() => reduce([1, 2, 3], add, -2)).toThrow();
    });

    it("[Phase 1 plan] throws an error if initial value is MAX_SAFE_INTEGER", () => {
      expect(() => reduce([1, 2, 5], add, Number.MAX_SAFE_INTEGER)).toThrow();
    });
  });

  describe("[AI-generated]", () => {
    // add.js cannot be assumed to work correctly, so a known-correct stand-in
    // with the same contract is used as the iteratee.
    const makeAdd = () => vi.fn((augend, addend) => augend + addend);

    // Valid partition: cart size
    it("returns the initial value for an empty cart", () => {
      const add = makeAdd();
      expect(reduce([], add, 0)).toBe(0);
      expect(add).not.toHaveBeenCalled();
    });

    it("returns the price of a single-product cart", () => {
      expect(reduce([49.99], makeAdd(), 0)).toBeCloseTo(49.99, 2);
    });

    it("returns the sum of a multi-product cart", () => {
      expect(reduce([10, 20.5, 30.25], makeAdd(), 0)).toBeCloseTo(60.75, 2);
    });

    it("adds the prices to a non-zero initial value", () => {
      expect(reduce([10, 20], makeAdd(), 5)).toBe(35);
    });

    it("calls the iteratee once per product with (total, price, index, cart)", () => {
      const add = makeAdd();
      const cart = [10, 20, 30];
      reduce(cart, add, 0);
      expect(add).toHaveBeenCalledTimes(3);
      expect(add).toHaveBeenNthCalledWith(1, 0, 10, 0, cart);
      expect(add).toHaveBeenNthCalledWith(2, 10, 20, 1, cart);
      expect(add).toHaveBeenNthCalledWith(3, 30, 30, 2, cart);
    });

    it("does not modify the cart", () => {
      const cart = [10, 20, 30];
      reduce(cart, makeAdd(), 0);
      expect(cart).toEqual([10, 20, 30]);
    });

    // Boundary values of a single price: valid side

    it("accepts the lower bound price 0", () => {
      expect(reduce([0], makeAdd(), 0)).toBe(0);
    });

    it("accepts the price just above the lower bound (0.01)", () => {
      expect(reduce([0.01], makeAdd(), 0)).toBeCloseTo(0.01, 2);
    });

    it("accepts the price just below the upper bound (999.99)", () => {
      expect(reduce([999.99], makeAdd(), 0)).toBeCloseTo(999.99, 2);
    });

    it("accepts the upper bound price 1000", () => {
      expect(reduce([1000], makeAdd(), 0)).toBe(1000);
    });

    it("accepts a cart made only of boundary prices", () => {
      expect(reduce([0, 0.01, 999.99, 1000], makeAdd(), 0)).toBeCloseTo(2000, 2);
    });

    // Cart total is not limited to 1000

    it("allows a total just above 1000", () => {
      expect(reduce([1000, 0.01], makeAdd(), 0)).toBeCloseTo(1000.01, 2);
    });

    it("allows a total far above 1000", () => {
      const cart = Array(100).fill(1000);
      expect(reduce(cart, makeAdd(), 0)).toBe(100000);
    });

    // Boundary values of a single price: invalid side

    it("throws for a price just below the lower bound (-0.01)", () => {
      expect(() => reduce([-0.01], makeAdd(), 0)).toThrow();
    });

    it("throws for a price just above the upper bound (1000.01)", () => {
      expect(() => reduce([1000.01], makeAdd(), 0)).toThrow();
    });

    // Invalid partitions: representatives far from the bounds

    it("throws for a clearly negative price", () => {
      expect(() => reduce([-500], makeAdd(), 0)).toThrow();
    });

    it("throws for a clearly too large price", () => {
      expect(() => reduce([5000], makeAdd(), 0)).toThrow();
    });

    // Invalid price mixed with valid prices, at different positions

    it("throws when the first product has an invalid price", () => {
      expect(() => reduce([-1, 10, 20], makeAdd(), 0)).toThrow();
    });

    it("throws when a middle product has an invalid price", () => {
      expect(() => reduce([10, 1001, 20], makeAdd(), 0)).toThrow();
    });

    it("throws when the last product has an invalid price", () => {
      expect(() => reduce([10, 20, -1], makeAdd(), 0)).toThrow();
    });

    it("throws when an invalid price would cancel out to a valid total", () => {
      expect(() => reduce([1500, -500], makeAdd(), 0)).toThrow();
    });
  });
});
