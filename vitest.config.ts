import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["test/**/*.test.js"],
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			include: [
				"src/filter.js",
				"src/reduce.js",
				"src/add.js",
				"src/get.js",
				"src/words.js",
				"src/isEmpty.js",
				"src/chunk.js",
				"src/ceil.js",
				"src/defaultTo.js",
				"src/isArrayLike.js",
			],
			exclude: ["src/.internal/**"],
		},
	},
});
