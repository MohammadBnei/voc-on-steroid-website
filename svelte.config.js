/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* jshint esversion: 9 */

// command env properties
const hasAdapter = process.env.ADAPTER;
const adapt = hasAdapter ? hasAdapter : 'node';
const isAMP = process.env.AMP ? true : false;

// Imports
import sveltePreprocess from 'svelte-preprocess';
import { resolve } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import staticAdapter from '@sveltejs/adapter-static';
import nodeAdapter from '@sveltejs/adapter-node';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { createRequire } from 'module';

const customRequire = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = customRequire('./package.json');

const options = JSON.parse(process.env.OPTIONS || '{}');

function getAdapters(adapt) {
	switch (adapt) {
		case 'node':
			return nodeAdapter;
		case 'static':
			return staticAdapter;
		case 'netlify':
			return netlifyAdapter;
		case 'vercel':
			return vercelAdapter;
		default:
			return nodeAdapter;
	}
}

const adapter = getAdapters(adapt);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess({
			postcss: true,
		}),
	],
	kit: {
		vite: () => ({
			ssr: {
				noExternal: [...Object.keys(pkg.dependencies || {})],
			},
			resolve: {
				alias: {
					$components: resolve(__dirname, './src/lib/shared/components'),
					$ui: resolve(__dirname, './src/lib/shared/ui'),
					$shared: resolve(__dirname, './src/lib/shared'),
					$models: resolve(__dirname, './src/lib/models'),
					$data: resolve(__dirname, './src/lib/data'),
					$core: resolve(__dirname, './src/lib/core'),
					$utils: resolve(__dirname, './src/lib/utils'),
					$entity: resolve(__dirname, './src/entity'),
					$stores: resolve(__dirname, './src/stores.ts'),
				},
			},
			server: {
				host: '0.0.0.0',
				port: 3000,
				hmr: {
					// clientPort: 8080,
				},
			},
		}),
	},
};

if (hasAdapter) {
	config.kit.adapter = adapter(options);
}

export default config;
