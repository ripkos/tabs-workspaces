import { writable, readonly } from 'svelte/store';
import type { Workspace } from '../lib/model';

const _workspaces = writable<Workspace[]>([]);
export function setWorkspaces(w: Workspace[]) {
	_workspaces.set(w);
}
export const workspaces = readonly(_workspaces);
export const draggedWorkspace = writable<Workspace | null>(null);
