import { describe, expect, it } from "vitest";
import isArrayLike from "#src/isArrayLike.js";

describe("isArrayLike", () =>{
    describe("Arrays", () => {
        it("Handles an empty array", () => {
            expect(isArrayLike([])).toBe(true);
        });

        it("Handles a non-empty array", () => {
            expect(isArrayLike([1, 2, 3])).toBe(true);
        });
    });
    
    describe("Strings", () => {
        it("Handles an empty string", () => {
            expect(isArrayLike("")).toBe(true);
        });

        it("Handles a non-empty string", () => {
            expect(isArrayLike("Milk")).toBe(true);
        });
    });

    describe("Ordinary objects", () => {
        it("Handles an empty object", () => {
            expect(isArrayLike({})).toBe(false);
        });

        it("Handles a product object", () => {
            expect(isArrayLike({
                name: "Milk",
                price: 1.15
            })).toBe(false);
        });

    });
});