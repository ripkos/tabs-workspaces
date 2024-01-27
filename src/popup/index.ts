import App from '../app/App.svelte';
import './global.css';
const app = new App({
	target: document.getElementById('app')!,
});

export default app;
