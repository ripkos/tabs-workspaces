import type { Tabs } from 'webextension-polyfill';
export enum MsgRequestType {
	GET_WORKSPACES = 'GET_WORKSPACES',
	UPDATE_WORKSPACES = 'UPDATE_WORKSPACES',
	UPDATE_SINGLE_WORKSPACE = 'UPDATE_SINGLE_WORKSPACE',
	MARK_DELETED_AS_DUMMY = 'MARK_DELETED_AS_DUMMY',
}
export const localStoragePrefix = 'workspaces-' as const;
export interface BaseMsg {
	type: MsgRequestType;
	windowId: number;
}

export interface MsgWithWorkspaces extends BaseMsg {
	type: MsgRequestType.UPDATE_WORKSPACES;
	workspaces: Workspace[];
}

export interface MsgWithSingleWorkspace extends BaseMsg {
	type: MsgRequestType.UPDATE_SINGLE_WORKSPACE | MsgRequestType.MARK_DELETED_AS_DUMMY;
	singleWorkspace: Workspace;
}

export type MsgRequest = BaseMsg | MsgWithWorkspaces | MsgWithSingleWorkspace;
export enum MsgResponseType {
	RECIEVE_WORKSPACES = 'RECIEVE_WORKSPACES',
}

export interface BaseMsgResponse {
	type: MsgResponseType;
}

export interface MsgResponseGetWorkspaces extends BaseMsgResponse {
	type: MsgResponseType.RECIEVE_WORKSPACES;
	workspaces: Workspace[];
}

export type MsgResponse = BaseMsgResponse | MsgResponseGetWorkspaces;

export enum WorkspaceOnInactive {
	HIDE = 'Hide',
	SUSPSEND = 'Suspend',
	CLOSE = 'Close',
}

export type Workspace = {
	id: number;
	name: string;
	colorPrimary: string;
	colorSecondary: string;
	tabs: Tabs.Tab[];
	onInactive: WorkspaceOnInactive;
	isDummy: boolean;
	isActive: boolean;
};
