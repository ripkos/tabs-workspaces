<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { getDummyWorkspaceHolder, getWorkspacesHolder, setWorkspacesHolder } from '../lib/browser-tools';
	import { getActiveWorkspace, type WorkspacesHolder } from '../lib/model';
	import TabTransferView from './views/tab-transfer/TabTransferView.svelte';
	import WorkspacesGridView from './views/workspaces-grid/WorkspacesGridView.svelte';

	let workspacesHolderStore: Writable<WorkspacesHolder> =
		writable<WorkspacesHolder>(getDummyWorkspaceHolder());
	async function syncTabsWithWorkspaces(wh: WorkspacesHolder) {
		const activeW = getActiveWorkspace(wh);
		const tabs = await browser.tabs.query({
			hidden: false,
			windowId: browser.windows.WINDOW_ID_CURRENT,
		});
		const notPresent = tabs.filter((t) => !activeW.tabs.some((t2) => t2.id === t.id));
		if (notPresent.length) {
			activeW.tabs.push(...notPresent);
			await setWorkspacesHolder(wh);
		}
	}
	onMount(async () => {
		const workspaces = await getWorkspacesHolder();
		await syncTabsWithWorkspaces(workspaces);
		workspacesHolderStore.set(workspaces);
		workspacesHolderStore.subscribe(async (wh) => {
			await setWorkspacesHolder(wh);
		});
	});
</script>

<main>
	<WorkspacesGridView {workspacesHolderStore}></WorkspacesGridView>
	<div class="separator"></div>
	<TabTransferView {workspacesHolderStore}></TabTransferView>
</main>

<style lang="scss">
	main {
		padding: 4px;
		width: 792px;
		height: 592px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
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
