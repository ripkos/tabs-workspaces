<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { getDummyWorkspaceHolder, getWorkspacesHolder, setWorkspacesHolder } from '../lib/browser-tools';
	import { getActiveWorkspace, type WorkspacesHolder } from '../lib/model';
	import WorkspaceActions from './workspace-actions/WorkspaceActions.svelte';
	import WorkspaceSelector from './workspace-selector/WorkspaceSelector.svelte';

	let workspacesHolderStore: Writable<WorkspacesHolder> =
		writable<WorkspacesHolder>(getDummyWorkspaceHolder());
	let entered = false;
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

<main class:entered>
	<WorkspaceSelector {workspacesHolderStore}></WorkspaceSelector>
	<div class="separator"></div>
	<WorkspaceActions {workspacesHolderStore} bind:entered></WorkspaceActions>
</main>

<style lang="scss">
	main {
		padding: 4px;
		max-width: 792px;
		max-height: 592px;
		display: grid;
		gap: 8px;
		grid-template-columns: minmax(0, 1fr);
		overflow: hidden;
		grid-template-rows: minmax(0, 4fr) 1px minmax(0, 3fr);
		&.entered {
			grid-template-rows: minmax(0, 2fr) 1px minmax(0, 5fr);
		}
		transition: ease-out height 200ms;
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
