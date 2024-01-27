import { WorkspaceOnInactive, type Workspace, type WorkspacesHolder } from './model';
import browser from 'webextension-polyfill';

export function getDefaultWorkspace(id: number, dummy = false): Workspace {
	return {
		id: id,
		name: dummy ? '+' : 'Workspace',
		color: '#999999',
		tabs: [],
		onInactive: WorkspaceOnInactive.HIDE,
		isDummy: dummy,
	};
}

export async function initEmptyWorkspaces() {
	const defaultWorkspace = getDefaultWorkspace(0);
	await browser.storage.local.set({
		workspaces: [defaultWorkspace],
		activeWorkspaceID: defaultWorkspace.id,
	});
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
