import { describe, expect, it } from "vitest";
import add from "#src/add.js";

describe("add", () => {
	it("adds two positive numbers", () => {
		expect(add(1, 1)).toBe(2);
	});
});
