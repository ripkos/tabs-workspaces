import { writable } from 'svelte/store';
import {
	getDefaultWorkspace,
	getWorkspacesHolder,
	setWorkspacesHolder,
} from '../lib/browser-tools';
import type { Workspace, WorkspacesHolder } from '../lib/model';
import { clearEmptyRows } from './shared';

export const workspacesHolder = writable<WorkspacesHolder>({
	activeWorkspaceID: 0,
	workspaces: [],
});
export async function initWorkspaceStore() {
	const wh = await getWorkspacesHolder();
	if (wh.workspaces.length === 0) {
		wh.workspaces.push(getDefaultWorkspace(0, false));
		wh.activeWorkspaceID = 0;
	}
	workspacesHolder.set(wh);
	clearEmptyRows(workspacesHolder);
	workspacesHolder.subscribe(async (wh) => {
		await setWorkspacesHolder(wh);
	});
}
export const draggedWorkspace = writable<Workspace | null>(null);
