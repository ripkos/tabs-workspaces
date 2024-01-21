import type { Tabs } from 'webextension-polyfill';

export enum WorkspaceOnInactive {
	HIDE = 'Hide',
	SUSPSEND = 'Suspend',
	CLOSE = 'Close',
}

export type Workspace = {
	id: string;
	name: string;
	color: string;
	tabs: Tabs.Tab[];
	onInactive: WorkspaceOnInactive
};

export type WorkspacesHolder = {
	workspaces: Workspace[];
	activeWorkspaceID: string;
};

export function getActiveWorkspace(wh: WorkspacesHolder): Workspace {
	return wh.workspaces.find((x) => x.id === wh.activeWorkspaceID)!;
}
