import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import webExtension from 'vite-plugin-web-extension';
export default defineConfig({
	plugins: [
		svelte(),
		webExtension({
			browser: 'firefox',
			skipManifestValidation: true,
			disableAutoLaunch: true,
			watchFilePaths: ['src', 'public'],
		}),
	],
	build: {
		sourcemap: 'inline',
	},
});
