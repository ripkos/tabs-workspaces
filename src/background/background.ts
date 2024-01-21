import browser from 'webextension-polyfill';
import type { Workspace, WorkspacesHolder } from '../lib/model';
import { getWorkspacesHolder, initEmptyWorkspaces } from '../lib/browser-tools';

browser.runtime.onInstalled.addListener(async (details) => {
	if (details.reason === 'install') {
		await initEmptyWorkspaces();
	}
});

browser.tabs.onCreated.addListener(async (x) => {});

browser.tabs.onAttached.addListener(async (x, i) => {});

//browser.tabs.onDetached.addListener(async (x, i)=>{});

browser.tabs.onRemoved.addListener(async (x, i) => {});
