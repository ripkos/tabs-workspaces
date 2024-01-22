<script lang="ts">
	import type { Writable } from 'svelte/store';
	import WorkspaceWithSettings from './WorkspaceWithSettingsComponent.svelte';
	import { getDefaultWorkspace } from '../../../lib/browser-tools';
	import type { WorkspacesHolder } from '../../../lib/model';
	const defaultWorkspace = getDefaultWorkspace();
	export let workspacesHolderStore: Writable<WorkspacesHolder>;
</script>

<section class="flex column flex-item">
	{#if $workspacesHolderStore}
		<ul class="flex column oy nowrap">
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
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<!-- <WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings>
			<WorkspaceWithSettings isDummy={true} w={defaultWorkspace}></WorkspaceWithSettings> -->
		</ul>
	{/if}
</section>

<style lang="scss">
	section {
		padding: 16px;
		ul {
			gap: 8px;
		}
	}
</style>
