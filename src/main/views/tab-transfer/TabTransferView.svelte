<script lang="ts">
	import WorkspaceWithTabs from './WorkspaceWithTabsComponent.svelte';
	import type { Writable } from 'svelte/store';
	import type { Workspace, WorkspacesHolder } from '../../../lib/model';

	export let workspacesHolderStore: Writable<WorkspacesHolder>;
</script>

<section class="flex-item">
	{#if $workspacesHolderStore}
		<ul class="workspaces active flex column nowrap">
			{#each $workspacesHolderStore.workspaces as w}
				{#if w.id === $workspacesHolderStore.activeWorkspaceID}
					<WorkspaceWithTabs {w} isActive={true}></WorkspaceWithTabs>
				{/if}
			{/each}
		</ul>
		<div class="interactions">
			<span>a</span>
		</div>
		<ul class="workspaces carousel flex ox">
			{#if $workspacesHolderStore.workspaces?.length > 1}
				{#each $workspacesHolderStore.workspaces as w}
					{#if w.id !== $workspacesHolderStore.activeWorkspaceID}
						<WorkspaceWithTabs {w}></WorkspaceWithTabs>
					{/if}
				{/each}
			{:else}
				<li class="placeholder flex center">
					<div>Create another workspace first</div>
				</li>
			{/if}
		</ul>
	{/if}
</section>

<style lang="scss">
	section {
		transition: flex ease 200ms;
		&:hover {
			flex-grow: 4;
		}
		padding: 16px;
		display: grid;
		grid-template-columns: 2fr 1fr 3fr;
		grid-template-rows: minmax(0, 1fr);
	}
	.placeholder {
		width: 100%;
		border: 2px dotted gray;
		div {
			color: gray;
		}
	}
</style>
