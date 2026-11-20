import { describe, expect, it } from "vitest";
import filter from "#src/filter.js";
/*
    AI was used for creating test cases 
*/
const products = [
    {name: "Milk", producer: "Valio", price: 1.24, contents: "White"},
    {name: "Coffee", producer: "Lofberg", price: 9.9},
    {name: "Cheese", producer: "Arla", price: 7.8},
    {name: "Mystery"}
    
]

describe("filter",  () => {
    describe("Normal behaviour is expected", () => {
        it("Returns only one matching element", () =>{
            expect(filter([1,6,15], x => x ===6)).toStrictEqual([6]);
        });
        
        it("Returns multiple matching elements", () => {
            expect(filter([1,4,15,24,17], x => x % 2 === 0)).toStrictEqual([4,24]);
        });

        it("Has all elements matching", () => {
            expect(filter([6,7,9], x => x > 0)).toStrictEqual([6,7,9]);
        });
    });

    describe("Nothing should be returned", () => {
        it("Tests what happens with an empty input array", () =>{
            expect(filter([], x => true)).toStrictEqual([]);
        });

        it("Tests what happens when no elements match", () => {
            expect(filter([1,2,3], x => x > 5)).toStrictEqual([]);
        });
    });

    describe("Boundary testing", () => {
  
        it("Should handle single-element array", () => {
            expect(filter([19], x => x > 10)).toStrictEqual([19]);
        });
    });
    
    describe("Predicate parameters tests", () => {
        it("Should pass Index correctly", () => {
            expect(filter(["a","b","c"], (value, index) => index === 1)).toStrictEqual(["b"]);
        });

        it("Should pass the original array correctly", () => {
            expect(filter([1,2,3], (value, index, arr) => arr.length === 3)).toStrictEqual([1,2,3]);
        });

    });

    describe("Robustness tests", () => {
        it("Handles case where predicate is always false", () => {
            expect(filter([4,6,7], () => false)).toStrictEqual([]);
        });
        it("Handles case where predicate is always true", () => {
            expect(filter([7,8,9], () => true)).toStrictEqual([7,8,9]);
        });
    });

    describe("E-Commerce oriented tests", () => {
        it("Should filter by producer", () => {
            expect(filter(products, p => p.producer === "Valio")).toStrictEqual([
                {name: "Milk", producer: "Valio", price: 1.24, contents: "White"}]);
    
        });

        it("Should filter out products without description", () => {
            expect(filter(products, p => p.contents !== undefined)).toStrictEqual([
                {name: "Milk", producer: "Valio", price: 1.24, contents: "White"} 
            ]);
        });

        it("Should filter out products outside price range", () => {
            expect(filter(products, p => p.price < 8 && p.price > 3 )).toStrictEqual([
                {name: "Cheese", producer: "Arla", price: 7.8}
            ]);
        });

    });
});