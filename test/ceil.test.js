import { describe, expect, it } from "vitest";
import ceil from "#src/ceil.js";

// testcases created with AI

describe("ceil", () => {
    describe("Normal rounding", () => {
        it("Rounds positive decimal numbers", () => {
            expect(ceil(4.006)).toBe(5);
        });

        it("Doesn't change a positive integer", () => {
            expect(ceil(5)).toBe(5);
        });

        it("Considers any fractional part", () => {
            expect(ceil(1.000003)).toBe(2);
        });
    });

    describe("Precision parameter", () => {
        it("Works with positive precision", () => {
            expect(ceil(6.004, 2)).toBe(6.01);
        });

        it("Works with one decimal place", () => {
            expect(ceil(6.01, 1)).toBe(6.1);
        });

        it("Works when value already matches precision", () => {
            expect(ceil(6.10, 2)).toBe(6.10);
        })

        it("Works with negative precision parameter", () => {
            expect(ceil(6040, -2)).toBe(6100);
        });

        it("Works with negative precision on non-round hundred", () => {
            expect(ceil(6123, -2)).toBe(6200);
        });
    });

    describe("Negative numbers", () => {
        it("Works with negative decimal", () => {
            expect(ceil(-4.7)).toBe(-4);
        });

        it("Doesn't round negative integer", () => {
            expect(ceil(-5)).toBe(-5);
        });

        it("Works with a negative close to integer", () => {
            expect(ceil(-4.001)).toBe(-4);
        });

        it("Works with negative with precision", () => {
            expect(ceil(-5.002, 2)).toBe(-5);
        });
    });

    describe("Zero", () => {
        it("Handles zero", () => {
            expect(ceil(0)).toBe(0);
        });
        
        it("Handles negative zero", () => {
            expect(ceil(-0)).toBe(0);
        });
    });

    describe("Large Values", () => {
        it("Handles large integer", () => {
            expect(ceil(1000000)).toBe(1000000);
        });

        it("Handles a large decimal", () => {
            expect(ceil(1000000.2)).toBe(1000001);
        });
    });

    describe("Boundary-value tests", () => {
        it("Handles a very small positive number", () => {
            expect(ceil(0.000001)).toBe(1);
        });

        it("Handles a number immediately below integer", () => {
            expect(ceil(4.999999)).toBe(5);
        });

    });

    describe("E-commerce related tests", () => {
        it("Rounds product prices with extra decimals correctly", () => {
            expect(ceil(2.501, 2)).toBe(2.51);
        });

        it("Crosses a whole-number boundary correctly", () => {
            expect(ceil(9.991, 2)).toBe(10.00);
        });
    });

});