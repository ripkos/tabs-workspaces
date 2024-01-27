import App from './App.svelte';
import './global.css';
import '../lib/util.scss';
const app = new App({
	target: document.getElementById('app')!,
});

export default app;
