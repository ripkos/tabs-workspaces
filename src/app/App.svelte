<script lang="ts">
	import browser from 'webextension-polyfill';
	import { onMount } from 'svelte';
	import { setWorkspaces } from './store';
	import TabTransferView from './TabTransferView.svelte';
	import WorkspaceSettingsView from './WorkspaceSettingsView.svelte';
	import WorkspacesGridView from './WorkspacesGridView.svelte';
	import {
		MsgRequestType,
		MsgResponseType,
		type MsgResponse,
		type MsgResponseGetWorkspaces,
	} from '../lib/model';

	browser.runtime.onMessage.addListener((msg: MsgResponse) => {
		if (msg.type === MsgResponseType.RECIEVE_WORKSPACES) {
			setWorkspaces((msg as MsgResponseGetWorkspaces).workspaces);
		}
	});
	// async function syncTabsWithWorkspaces() {
	// 	const wh = $workspacesHolder;
	// 	const activeW = wh.workspaces.find((x) => x.id === wh.activeWorkspaceID);
	// 	const tabs = await browser.tabs.query({
	// 		hidden: false,
	// 		windowId: browser.windows.WINDOW_ID_CURRENT,
	// 	});
	// 	if (activeW) {
	// 		const notPresent = tabs.filter((t) => !activeW.tabs.some((t2) => t2.id === t.id));
	// 		if (notPresent.length) {
	// 			workspacesHolder.update((wh) => {
	// 				const activeW = wh.workspaces.find((x) => x.id === wh.activeWorkspaceID)!;
	// 				activeW.tabs.push(...notPresent);
	// 				return wh;
	// 			});
	// 		}
	// 	} else {
	// 		workspacesHolder.update((wh) => {
	// 			const newID =
	// 				wh.workspaces.length < 1 ? 0 : Math.max(...wh.workspaces.map((w) => w.id)) + 1;
	// 			const activeW = getDefaultWorkspace(newID, false);
	// 			activeW.tabs.push(...tabs);
	// 			wh.activeWorkspaceID = activeW.id;
	// 			wh.workspaces.push(activeW);
	// 			return wh;
	// 		});
	// 	}
	// }

	onMount(async () => {
		const windowId = browser.windows.WINDOW_ID_CURRENT;
		await browser.runtime.sendMessage({ type: MsgRequestType.GET_WORKSPACES, windowId });
	});
</script>

<main>
	<div class="left">
		<WorkspaceSettingsView></WorkspaceSettingsView>
	</div>
	<div class="right">
		<WorkspacesGridView></WorkspacesGridView>
		<TabTransferView></TabTransferView>
	</div>
</main>

<style lang="scss">
	@import '../lib/vars';
	$width: 800px;
	$heigh: 600px;
	$padding: $x4;
	main {
		display: flex;
		flex-wrap: nowrap;
		padding: $padding;
		max-width: calc(#{$width} - (#{$padding} * 2));
		max-height: calc(#{$heigh} - (#{$padding} * 2));
		overflow: hidden;
		gap: $x4;
		div {
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			&.left {
			}
			&.right {
				gap: $x4;
			}
		}
	}

	.separator {
		text-align: center;
		width: 0;
		height: 0;
		border-width: 0;
		border-top-width: 1px;
		border-color: black;
		border-style: solid;
		width: 100%;
		&::after {
			content: '';
		}
	}
</style>
