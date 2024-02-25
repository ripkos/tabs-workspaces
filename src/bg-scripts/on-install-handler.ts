import browser from 'webextension-polyfill';
browser.runtime.onInstalled.addListener(async (details) => {
	if (details.reason === 'install') {
	}
});
