import browser from 'webextension-polyfill';
import {
	MsgRequestType,
	localStoragePrefix,
	type MsgRequest,
	type Workspace,
	type MsgWithWorkspaces,
	type MsgWithSingleWorkspace,
	MsgResponseType,
} from '../lib/model';
import { getDefaultWorkspace } from '../lib/browser-tools';
import { sendMessageResponse } from './shared';

function getNewId(workspaces: Workspace[]): number {
	return workspaces.length ? Math.max(...workspaces.map((w) => w.id)) + 1 : 0;
}

async function getWorkspaces(window: number): Promise<Workspace[]> {
	const workspacesRecord = await browser.storage.local.get(`${localStoragePrefix}${window}`);
	const workspaces = workspacesRecord[`${localStoragePrefix}${window}`] as Workspace[] | undefined;
	if (!workspaces) {
		await updateWorkspaces(window, []);
		return await getWorkspaces(window);
	}
	return workspaces;
}

async function updateWorkspaces(windowId: number, workspaces: Workspace[]): Promise<void> {
	//removes empty rows
	try {
		const indexesOfRowsToDelete = [];
		for (let start = 0; workspaces.length > 12 && start < workspaces.length - 4; start += 4) {
			const shouldDelete = workspaces
				.slice(start, start + 4)
				.reduce((last, w) => w.isDummy && last, true);
			if (shouldDelete) {
				indexesOfRowsToDelete.push(start);
			}
		}
		indexesOfRowsToDelete.reverse().forEach((x) => {
			workspaces.splice(x, 4);
		});
		while (workspaces.length < 12) {
			const newID = getNewId(workspaces);
			workspaces.push(getDefaultWorkspace(newID, true));
		}
		if (workspaces.slice(-4).reduce((last, w) => !w.isDummy && last, true)) {
			for (let i = 0; i < 4; i++) {
				const newID = getNewId(workspaces);
				workspaces.push(getDefaultWorkspace(newID, true));
			}
		}
		//saves to storage
		await browser.storage.local.set({
			[`${localStoragePrefix}${windowId}`]: workspaces,
		});
	} catch (e) {
		console.error(e);
	}
}

async function updateSingleWorkspace(window: number, singleWorkspace: Workspace): Promise<void> {
	const workspaces = await getWorkspaces(window);
	const indexOfWorkspace = workspaces.findIndex((workspace) => workspace.id === singleWorkspace.id);
	if (indexOfWorkspace === -1) {
		workspaces.push(singleWorkspace);
	} else {
		workspaces[indexOfWorkspace] = singleWorkspace;
	}
	await updateWorkspaces(window, workspaces);
}

async function markDeletedAsDummy(windowId: number, singleWorkspace: Workspace): Promise<void> {
	const newWorkspace = getDefaultWorkspace(singleWorkspace.id, true);
	await updateSingleWorkspace(windowId, newWorkspace);
}

browser.runtime.onMessage.addListener(async (msg: MsgRequest, sender) => {
	let shouldSendResponse = false;
	switch (msg.type) {
		case MsgRequestType.GET_WORKSPACES: {
			shouldSendResponse = true;
			break;
		}
		case MsgRequestType.UPDATE_WORKSPACES: {
			shouldSendResponse = true;
			await updateWorkspaces(msg.windowId, (msg as MsgWithWorkspaces).workspaces);
			break;
		}
		case MsgRequestType.UPDATE_SINGLE_WORKSPACE: {
			shouldSendResponse = true;
			await updateSingleWorkspace(msg.windowId, (msg as MsgWithSingleWorkspace).singleWorkspace);
			break;
		}
		case MsgRequestType.MARK_DELETED_AS_DUMMY: {
			shouldSendResponse = true;
			await markDeletedAsDummy(msg.windowId, (msg as MsgWithSingleWorkspace).singleWorkspace);
			break;
		}
	}
	if (shouldSendResponse) {
		const workspaces = await getWorkspaces(msg.windowId);
		await sendMessageResponse({ type: MsgResponseType.RECIEVE_WORKSPACES, workspaces });
		return;
	}
});
