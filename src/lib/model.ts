import type { Tabs } from 'webextension-polyfill';

export type Workspace = {
	id: string;
	name: string;
	color: string;
	tabs: Tabs.Tab[];
};

export type WorkspacesHolder = {
	workspaces: Workspace[];
	activeWorkspaceID: string;
};

export function getActiveWorkspace(wh: WorkspacesHolder): Workspace {
	return wh.workspaces.find((x) => x.id === wh.activeWorkspaceID)!;
}
