import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

import pkg from './package.json';

const plugins = [
	nodeResolve({
		extensions: ['.cjs','.mjs', '.js']
	}),
	commonjs(),
	json()
];

export default [
	// browser-friendly UMD build
	{
		input: pkg.main,
		output: {
			name: 'Paged',
			file: pkg.browser.replace(".js", ".legacy.js"),
			format: 'umd'
		},
		plugins: plugins
	},
	{
		input: "./lib/polyfill/polyfill.cjs",
		output: {
			name: 'PagedPolyfill',
			file: "./dist/paged.legacy.polyfill.js",
			format: 'umd'
		},
		plugins: plugins
	}
];
