import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import license from "rollup-plugin-license";

import pkg from "./package.json";

const plugins = [
	nodeResolve(),
	commonjs({
		include: "node_modules/**"
	}),
	json(),
	license({
		banner: "@license Paged.js v<%= pkg.version %> | MIT | https://gitlab.pagedmedia.org/tools/pagedjs",
	})
];

export default [
	// browser-friendly UMD build
	{
		input: pkg.main,
		output: {
			name: "Paged",
			file: pkg.browser,
			format: "umd"
		},
		plugins: plugins
	},

	{
		input: pkg.main,
		output: {
			name: "PagedModule",
			file: "./dist/paged.esm.js",
			format: "es"
		},
		plugins: plugins
	},

	{
		input: "./src/polyfill/polyfill.js",
		output: {
			name: "PagedPolyfill",
			file: "./dist/paged.polyfill.js",
			format: "umd"
		},
		plugins: plugins
	}
];
