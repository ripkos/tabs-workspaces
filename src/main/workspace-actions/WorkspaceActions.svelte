<script lang="ts">
  import WorkspaceWithTabs from './WorkspaceWithTabs.svelte';

	import type { Writable } from 'svelte/store';
	import type { Workspace, WorkspacesHolder } from '../../lib/model';
	export let workspacesHolderStore: Writable<WorkspacesHolder>;
</script>

<section>
	{#if $workspacesHolderStore}
		<ul class="workspaces active">
			{#each $workspacesHolderStore.workspaces as w}
				{#if w.id === $workspacesHolderStore.activeWorkspaceID}
					<WorkspaceWithTabs {w} isActive={true}></WorkspaceWithTabs>
				{/if}
			{/each}
		</ul>
		<div class="interactions">
			<span>a</span>
		</div>
		<ul class="workspaces carousel">
			{#if $workspacesHolderStore.workspaces?.length > 1}
				{#each $workspacesHolderStore.workspaces as w}
					{#if w.id !== $workspacesHolderStore.activeWorkspaceID}
						<WorkspaceWithTabs {w}></WorkspaceWithTabs>
					{/if}
				{/each}
			{:else}
				<li class="placeholder">
					<span>+</span>
				</li>
			{/if}
		</ul>
	{/if}
</section>

<style lang="scss">
	section {
		display: grid;
		grid-template-columns: 2fr 1fr 3fr;
		grid-template-rows: minmax(0, 1fr);
		.workspaces {
			display: flex;
			flex-direction: row;
			&.carousel {
				overflow-x: scroll;
				.placeholder {
					display: flex;
					text-align: center;
					justify-items: center;
					border: 2px dotted aqua;
					span {
						flex-grow: 1;
					}
				}
			}
		}
	}
</style>
