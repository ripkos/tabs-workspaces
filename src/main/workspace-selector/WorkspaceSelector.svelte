<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { WorkspacesHolder } from '../../lib/model';
	import WorkspaceWithSettings from './WorkspaceWithSettings.svelte';
	import { getDefaultWorkspace } from '../../lib/browser-tools';
	const defaultWorkspace = getDefaultWorkspace();
	export let workspacesHolderStore: Writable<WorkspacesHolder>;
</script>

<section>
	{#if $workspacesHolderStore}
		<ul>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			{#each $workspacesHolderStore.workspaces as w}
				{#if w.id === $workspacesHolderStore.activeWorkspaceID}
					<WorkspaceWithSettings {w} isActive={true}></WorkspaceWithSettings>
				{/if}
			{/each}
			{#each $workspacesHolderStore.workspaces as w}
				{#if w.id !== $workspacesHolderStore.activeWorkspaceID}	
					<WorkspaceWithSettings {w}></WorkspaceWithSettings>
				{/if}
			{/each}
		</ul>
	{/if}
</section>

<style lang="scss">
	section {
		ul {
		}
	}
</style>
