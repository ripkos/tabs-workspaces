<script lang="ts">
	import { WorkspaceOnInactive, type Workspace } from "../../lib/model";

	export let isDummy = false;
	export let isActive = false;
	export let w: Workspace;
	const colors = [1,2,3,4,5,7,8]
</script>

<li>
	<button style="{isDummy ? "visibility: hidden;" : ""}" disabled={isDummy || isActive}>Delete</button>
	<div>
		<button on:click={()=>w.onInactive=WorkspaceOnInactive.HIDE}>{WorkspaceOnInactive.HIDE}</button>
		<button on:click={()=>w.onInactive=WorkspaceOnInactive.SUSPSEND}>{WorkspaceOnInactive.SUSPSEND}</button>
		<button on:click={()=>w.onInactive=WorkspaceOnInactive.CLOSE}>{WorkspaceOnInactive.CLOSE}</button>
	</div>
	<div class="color-picker">
		{#each colors as c}
			<span>{c}</span>
		{/each}
	</div>
	<span>{w.name}</span>
</li>

<style lang="scss">
	li {
		display: flex;
		flex-direction: row;
	}
</style>