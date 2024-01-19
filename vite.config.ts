import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import webExtension from 'vite-plugin-web-extension';
export default defineConfig({
	plugins: [
		svelte(),
		webExtension({
			browser: "firefox",
			skipManifestValidation: true,
			disableAutoLaunch: true,
			watchFilePaths: ["src", "public"]
		}),
	],
});
// https://vitejs.dev/config/
/*
export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/main.js'),
			name: "background",
			fileName: 'background',
		},
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/main/index.html'),
			},
			output: {
				preserveModules: false
			}
		},
	},
});
*/
