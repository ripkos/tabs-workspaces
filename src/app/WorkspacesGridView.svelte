<script lang="ts">
	import { clearEmptyRows } from './shared';
	import { workspacesHolder, draggedWorkspace } from './store';
	let draggedIndex = -1;
	let hoverOverIndex = -1;
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

	function swapWorkspaces(i1: number, i2: number) {
		if (i1 === i2) return;
		workspacesHolder.update((x) => {
			[x.workspaces[i1], x.workspaces[i2]] = [x.workspaces[i2], x.workspaces[i1]];
			return x;
		});
	}

	let drag = false;
</script>

<section>
	{#if $workspacesHolder}
		<ul>
			{#each $workspacesHolder.workspaces as w, i}
				<li class:drag={drag && i !== draggedIndex && i === hoverOverIndex}>
					<button
						style="background-color: {w.colorPrimary};"
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
							draggedIndex = i;
							drag = true;
							event.dataTransfer && (event.dataTransfer.effectAllowed = 'all');
						}}
						on:dragend={() => {
							draggedIndex = -1;
							$draggedWorkspace = null;
						}}
						on:dragenter={(event) => {
							event.preventDefault();
						}}
						on:dragleave={(event) => {
							event.preventDefault();
							hoverOverIndex = -1;
						}}
						on:dragover={(event) => {
							if (i !== draggedIndex) {
								event.preventDefault();
								event.dataTransfer && (event.dataTransfer.dropEffect = 'move');
								hoverOverIndex = i;
							}
						}}
						on:drop={(event) => {
							if (draggedIndex > -1) {
								swapWorkspaces(draggedIndex, i);
							}
							drag = false;
							draggedIndex = -1;
							hoverOverIndex = -1;
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
	@import '../lib/vars';
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
				&.drag {
					button,
					.dummy {
						border: $x2 yellow dotted;
						color: red;
					}
				}
				button {
					border: $x2 black solid;
					&.dummy {
						border: $x2 grey dotted;
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
