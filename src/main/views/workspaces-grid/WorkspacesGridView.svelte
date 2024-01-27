<script lang="ts">
	import { clearEmptyRows } from '../../shared';
	import { workspacesHolder, draggedWorkspace } from '../../store';

	$: len =
		$workspacesHolder.workspaces.length > 4 ? ($workspacesHolder.workspaces.length > 9 ? 4 : 3) : 2;

	function replaceDummyWithWorkspace(index: number) {
		workspacesHolder.update((x) => {
			x.workspaces[index].isDummy = false;
			x.workspaces[index].name = 'Workspace';
			return x;
		});
		clearEmptyRows(workspacesHolder);
	}
	function setActiveWorkspace(id: number) {
		workspacesHolder.update((x) => {
			x.activeWorkspaceID = id;
			return x;
		});
	}
</script>

<section>
	{#if $workspacesHolder}
		<ul style="">
			{#each $workspacesHolder.workspaces as w, i}
				<li>
					<button
						class:dummy={w.isDummy}
						draggable={!w.isDummy}
						on:click={() => {
							if (w.isDummy) {
								replaceDummyWithWorkspace(i);
							} else {
								setActiveWorkspace(w.id);
							}
						}}
						on:dragstart={(event) => {
							$draggedWorkspace = w;
							event.dataTransfer && (event.dataTransfer.effectAllowed = 'all');
							//event.preventDefault();
						}}
						on:dragend={() => {
							$draggedWorkspace = null;
						}}
					>
						<span>{w.name}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style lang="scss">
	@import '../../../lib/vars';
	section {
		flex: 1 1 auto;
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: #21262121 #7360731c;
		ul {
			padding-right: $x4;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			//grid-template-rows: repeat(2, 1fr);
			grid-auto-flow: row dense;
			gap: $x4;
			li {
				width: $x8;
				height: $x8;
				padding: 0;
				margin: 0;
				font-size: $x5;
				button {
					border: $x2 black solid;
					&.dummy {
						border: $x2 grey dotted;
						background-color: rgba(128, 128, 128, 0.05);
					}
					width: 100%;
					height: 100%;
					span {
						width: 100%;
						height: 100%;
						display: grid;
						align-items: center;
					}
				}
			}
		}
	}
</style>
