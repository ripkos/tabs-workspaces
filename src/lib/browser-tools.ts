import { WorkspaceOnInactive, type Workspace } from './model';
import browser from 'webextension-polyfill';
export function getDefaultWorkspace(id: number, dummy = false): Workspace {
	return {
		id: id,
		name: dummy ? '+' : 'Workspace',
		colorPrimary: '#8080800c',
		colorSecondary: '#afafaf',
		tabs: [],
		onInactive: WorkspaceOnInactive.HIDE,
		isDummy: dummy,
		isActive: false,
	};
}
