import { type Writable, derived, writable } from 'svelte/store';
import {
	getDummyWorkspaceHolder,
	getWorkspacesHolder,
	setWorkspacesHolder,
} from '../lib/browser-tools';
import type { Workspace, WorkspacesHolder } from '../lib/model';

export const workspacesHolder = writable<WorkspacesHolder>(getDummyWorkspaceHolder());
const activeWorkspace = derived<Writable<WorkspacesHolder>, Workspace>(workspacesHolder, (wh) => {
	wh.workspaces.find((x) => x.id === wh.activeWorkspaceID);
});
export async function initWorkspaceStore() {
	const wh = await getWorkspacesHolder();
	workspacesHolder.set(wh);
	workspacesHolder.subscribe(async (wh) => {
		await setWorkspacesHolder(wh);
		console.log('Called in subscribe', wh);
	});
}
export const draggedWorkspace = writable<Workspace | null>(null);
export default activeWorkspace;
