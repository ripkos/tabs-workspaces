<script lang="ts">
	import type { Workspace } from '../../../lib/model';
	import WorkspaceWithTabs from './WorkspaceWithTabs.svelte';
	let workspaceLeft: Workspace | null = null;
	let workspaceRight: Workspace | null = null;
</script>

<section class:selection-mode={workspaceLeft !== null || workspaceRight !== null}>
	<WorkspaceWithTabs bind:w={workspaceLeft}></WorkspaceWithTabs>
	<div>
		<button>M</button>
		<button>DEL</button>
	</div>
	<WorkspaceWithTabs bind:w={workspaceRight}></WorkspaceWithTabs>
</section>

<style lang="scss">
	@import '../../../lib/vars';
	section {
		flex: 1 0 $x6;
		transition: flex ease 200ms;
		border-top: $x2 black solid;
		&.selection-mode {
			flex-basis: $x9;
		}
		padding: $x5;
		display: grid;
		grid-template-columns: 2fr 1fr 2fr;
		grid-template-rows: 1fr;
		div {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: column;
			button {
				display: block;
				width: $x5;
				height: $x5;
				border-radius: 50%;
			}
		}
	}
	.placeholder {
		width: 100%;
		border: $x2 dotted gray;
		div {
			color: gray;
		}
	}
</style>
