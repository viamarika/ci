import { describe, expect, it } from "vitest";
import isEmpty from "#src/isEmpty.js"

// Test cases created by AI

describe("isEmpty", () => {
    describe("Primitive values", () => {
        it("Works with boolean true", () => {
            expect(isEmpty(true)).toBe(true);
        });

        it("Works with boolean false", () => {
            expect(isEmpty(false)).toBe(true);
        });

        it("Works with a number", () => {
            expect(isEmpty(42)).toBe(true);
        });
    });

    describe("Arrays", () => {
        it("Works with an empty array", () => {
            expect(isEmpty([])).toBe(true);
        });

        it("Works with arrays with one element", () => {
            expect(isEmpty([42])).toBe(false);
        });

        it("Works with array with several elements", () => {
            expect(isEmpty([8, 26, 32])).toBe(false);
        });

    });  
    
    describe("Strings", () => {
        it("Handles an empty string", () => {
            expect(isEmpty("")).toBe(true);
        });

        it("Handles a non- empty string", () => {
            expect(isEmpty("kokkeli")).toBe(false);
        });

        it("Handles a string containing only spaces", () => {
            expect(isEmpty("     ")).toBe(false);
        });
    });

    describe("Objects", () => {
        it("Handles an empty object", ()=> {
            expect(isEmpty({})).toBe(true);
        });

        it("Handles an object with one property", () => {
            expect(isEmpty({ Adams : 42 })).toBe(false);
        });

        it("Handles an object with several properties", () => {
            expect(isEmpty({ Adams: 42 , Pratchett : 41 })).toBe(false);
        });

    });

    describe("Map objects", () => {
        it("Handles an empty map", () => {
            expect(isEmpty(new Map())).toBe(true);
        });
        
        it("Handles a map with element", () => {
            expect(isEmpty(new Map([[ "April", 420 ]]))).toBe(false);
        });

    });

    describe("Set objects", () => {
        it("Handles an empty set", () => {
            expect(isEmpty(new Set())).toBe(true);
        });

        it("Handles a non- empty set", () => {
            expect(isEmpty(new Set([5]))).toBe(false);
        });
    })

    describe("Typed arrays", () => {
        it("Handles an empty typed array", () => {
            expect(isEmpty(new Uint8Array(0))).toBe(true);
        });

        it("Handles a non-empty typed array", () => {
            expect(isEmpty(new Uint8Array([1, 2]))).toBe(false);
        });
        
    });

    describe("Inherited properties", () => {
        const parent = { a: 1 };
        const child = Object.create(parent);

        it("Should handle an object with only inherited properties", () => {
            expect(isEmpty(child)).toBe(true);
        });
    });

});