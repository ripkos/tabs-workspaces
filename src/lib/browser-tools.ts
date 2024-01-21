import type { Workspace, WorkspacesHolder } from './model';
import browser from 'webextension-polyfill';

const emptyWorkspace: Workspace = {
	id: new Date().toString(),
	name: 'Default',
	color: '#999999',
	tabs: [],
};
export const dummyWorkspace: WorkspacesHolder = {
	workspaces: [emptyWorkspace],
	activeWorkspaceID: emptyWorkspace.id,
};
export async function initEmptyWorkspaces() {
	await browser.storage.local.set(dummyWorkspace);
}

export async function getWorkspacesHolder(): Promise<WorkspacesHolder> {
	return (await browser.storage.local.get([
		'workspaces',
		'activeWorkspaceID',
	])) as Promise<WorkspacesHolder>;
}

export async function setWorkspacesHolder(workspacesHolder: WorkspacesHolder): Promise<void> {
	await browser.storage.local.set(workspacesHolder);
}
