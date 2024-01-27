import { type Writable } from 'svelte/store';
import type { WorkspacesHolder } from '../lib/model';
import { getDefaultWorkspace } from '../lib/browser-tools';

export function clearEmptyRows(wh: Writable<WorkspacesHolder>): void {
	wh.update((wh) => {
		const indexesOfRowsToDelete = [];
		for (let start = 0; wh.workspaces.length > 12 && start < wh.workspaces.length - 4; start += 4) {
			const shouldDelete = wh.workspaces
				.slice(start, start + 4)
				.reduce((last, w) => w.isDummy && last, true);
			if (shouldDelete) {
				indexesOfRowsToDelete.push(start);
			}
		}
		indexesOfRowsToDelete.reverse().forEach((x) => {
			wh.workspaces.splice(x, 4);
		});
		while (wh.workspaces.length < 12) {
			const newID = Math.max(...wh.workspaces.map((w) => w.id)) + 1;
			wh.workspaces.push(getDefaultWorkspace(newID, true));
		}
		if (wh.workspaces.slice(-4).reduce((last, w) => !w.isDummy && last, true)) {
			for (let i = 0; i < 4; i++) {
				const newID = Math.max(...wh.workspaces.map((w) => w.id)) + 1;
				wh.workspaces.push(getDefaultWorkspace(newID, true));
			}
		}
		return wh;
	});
}
