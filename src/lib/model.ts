import type { Tabs } from 'webextension-polyfill';

export enum WorkspaceOnInactive {
	HIDE = 'Hide',
	SUSPSEND = 'Suspend',
	CLOSE = 'Close',
}

export type Workspace = {
	id: number;
	name: string;
	color: string;
	tabs: Tabs.Tab[];
	onInactive: WorkspaceOnInactive;
	isDummy: boolean;
};

export type WorkspacesHolder = {
	workspaces: Workspace[];
	activeWorkspaceID: number;
};
