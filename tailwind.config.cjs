/* jshint esversion: 9 */

module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			listStyleType: ['hover', 'focus'],
			listStylePosition: ['hover', 'focus'],
		},
		scrollbar: ['rounded', 'dark'],
	},
	plugins: [require('daisyui'), require('tailwind-scrollbar')],
	daisyui: {
		themes: ['garden', 'coffee'],
		darkTheme: 'coffee',
	},
};
