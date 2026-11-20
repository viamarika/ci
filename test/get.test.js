import { describe, expect, it } from "vitest";
import get from "#src/get.js"

// Test cases were created by AI

const product = {
    name: "Cheese",
    price: 7.79,
    producer: "Juustoportti",
    contents: { ingredients: [ "milk", "salt", "joy"]}
};

describe("get", () => {
    describe("Normal functionality", () =>{
        it("Returns nested value from string path", () => {
            expect(get(
                { a: [{ b: { c: 3 } }] },
                "a[0].b.c"
            )).toBe(3);
        });

        it("Returns nested value from array path", () => {
            expect(get(
                { a: [{ b: { c: 3 } }] },
                ["a","0","b","c"]
            )).toBe(3);
        });

        it("Returns top-level property", () => {
            expect(get(
                { price : 9.95 },
                "price"
            )).toBe(9.95)
        })

    });

    describe("Missing path", () => {
        it("Returns default value for missing property", () => {
            expect(get(
                { a: 1 },
                "b",
                "default"
            )).toBe("default");
        });

        it("Returns default value for missing nested property", () => {
            expect(get(
                { a: { b: 1} },
                "a.c",
                "default"
            )).toBe("default")
        });

        it("Returns undefined when property is missing and no default is provided", () => {
            expect(get(
                { a:1 },
                "b"
            )).toBeUndefined();
        });

    });

    describe("Boundary tests", () => {
        it("Handles empty object", () => {
            expect(get(
                {},
                "a",
                "default"
            )).toBe("default");
        });

        it("Returns default value for empty string path", () => {
            expect(get(
                {a:1}, 
                "",
                "default"
            )).toBe("default");
        });

        it("Returns undefined for empty string path when no default is given", () => {
            expect(get(
                { a: 41 },
                ""
            )).toBeUndefined();
        });

        it("Returns default value for empty array path", () => {
            expect(get(
                { a:1 }, [] ,"default"
            )).toBe("default")
        });

        it("Returns value stored under an empty-string property", () => {
            expect(get(
                { "": 198 },
                "",
                "default"
            )).toBe(198);
        });
    });


    describe("Special cases", () => {
        it("Does not replace 0 with default value", () => {
            expect(get(
                { amount: 0 },
                "amount",
                999
            )).toBe(0)
        });

        it("Does not replace false with default value", () => {
            expect(get(
                { active: false },
                "active",
                true
            )).toBe(false);
        });

        it("Does not replace empty string with default value", () => {
            expect(get(
                {name: "" },
                "name",
                "unknown"
            )).toBe("");
        });

    });

    describe("E-Commerce oriented tests", () => {
        it("Returns product price", () => {
            expect(get(
                product,
                "price"
            )).toBe(7.79);
        });

        it("Returns the producer's name", () => {
            expect(get(
                product,
                "producer",
            )).toBe("Juustoportti");
        })

        it("Returns default value when a category is missing", () => {
            expect(get(
                product,
                "category",
                "not provided"
            )).toBe("not provided");
        });

        it("Returns content information when it is given", () => {
            expect(get(
                product,
                "contents.ingredients"
            )).toStrictEqual(["milk", "salt", "joy"]);
        });
    });
});
