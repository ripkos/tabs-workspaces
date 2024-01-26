<script lang="ts">
	import { onMount } from 'svelte';
	import { getWorkspacesHolder, setWorkspacesHolder } from '../lib/browser-tools';
	import type { WorkspacesHolder } from '../lib/model';
	import TabTransferView from './views/tab-transfer/TabTransferView.svelte';
	import WorkspacesGridView from './views/workspaces-grid/WorkspacesGridView.svelte';
	import { initWorkspaceStore, workspacesHolder } from './store';
	import WorkspaceSettingsView from './views/workspace-settings/WorkspaceSettingsView.svelte';

	async function syncTabsWithWorkspaces() {
		const wh = $workspacesHolder;
		const activeW = wh.workspaces.find((x) => x.id === wh.activeWorkspaceID)!;
		const tabs = await browser.tabs.query({
			hidden: false,
			windowId: browser.windows.WINDOW_ID_CURRENT,
		});
		const notPresent = tabs.filter((t) => !activeW.tabs.some((t2) => t2.id === t.id));
		if (notPresent.length) {
			workspacesHolder.update((wh) => {
				const activeW = wh.workspaces.find((x) => x.id === wh.activeWorkspaceID)!;
				activeW.tabs.push(...notPresent);
				return wh;
			});
		}
	}

	let fillWorkspaces: () => void;

	onMount(async () => {
		await initWorkspaceStore();
		await syncTabsWithWorkspaces();
		fillWorkspaces();
	});
</script>

<main>
	<div class="left">
		<WorkspaceSettingsView></WorkspaceSettingsView>
	</div>
	<div class="right">
		<WorkspacesGridView bind:fillWorkspaces></WorkspacesGridView>
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
