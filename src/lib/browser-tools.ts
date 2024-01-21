import { WorkspaceOnInactive, type Workspace, type WorkspacesHolder } from './model';
import browser from 'webextension-polyfill';

export function getDefaultWorkspace() : Workspace {
	return {
		id: new Date().toString(),
		name: 'Unnamed',
		color: '#999999',
		tabs: [],
		onInactive: WorkspaceOnInactive.HIDE
	};
}

export function getDummyWorkspaceHolder(): WorkspacesHolder {
	const defaultWorkspace = getDefaultWorkspace();
	return {
		workspaces: [defaultWorkspace],
		activeWorkspaceID: defaultWorkspace.id,
	};
}

export async function initEmptyWorkspaces() {
	await browser.storage.local.set(getDummyWorkspaceHolder());
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
