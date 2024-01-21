<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Workspace, WorkspacesHolder } from '../../lib/model';
	export let workspacesHolderStore: Writable<WorkspacesHolder>;
</script>

<section>
	{#if $workspacesHolderStore}
		<ul>
			{#each $workspacesHolderStore.workspaces as w}
				<li>
					<span>{w.name}</span>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style lang="scss">
</style>
