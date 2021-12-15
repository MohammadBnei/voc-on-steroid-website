/* jshint esversion: 9 */

const postcssMixins = require('postcss-mixins');
const postcssAtRulesVariables = require('postcss-at-rules-variables');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const postcssNesting = require('tailwindcss/nesting');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const variables = require('./config/postcss/variables.cjs');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
	syntax: 'postcss-scss',
	plugins: [
		// Some plugins, like postcss-nested, need to run before Tailwind

		postcssMixins(),
		postcssAtRulesVariables(),
		postcssImport(),
		postcssSimpleVars({
			variables: variables,
		}),
		postcssNesting(),
		tailwindcss(),

		// But others, like autoprefixer, need to run after

		autoprefixer(),
		!dev &&
			cssnano({
				preset: 'default',
			}),
	],
};
