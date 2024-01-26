<script lang="ts">
	import { workspacesHolder } from '../../store';
	import { getDefaultWorkspace } from '../../../lib/browser-tools';
	import { draggedWorkspace } from '../../store';
	function shouldExpand(l: number): boolean {
		return (!(l === 4 || l === 9 || l === 16) && l <= 16) || (l > 16 && l % 4 !== 0);
	}

	$: len =
		$workspacesHolder.workspaces.length > 4 ? ($workspacesHolder.workspaces.length > 9 ? 4 : 3) : 2;

	export function fillWorkspaces() {
		while (shouldExpand($workspacesHolder.workspaces.length)) {
			addWorkspace(true);
		}
	}
	function addWorkspace(dummy = false) {
		workspacesHolder.update((x) => {
			x.workspaces.push(getDefaultWorkspace(dummy));
			return x;
		});
		if (!dummy) fillWorkspaces();
	}
</script>

<section>
	{#if $workspacesHolder}
		<ul style="grid-template-columns: repeat({len}, 1fr);">
			{#each $workspacesHolder.workspaces as w}
				<li>
					<button
						class:dummy={w.isDummy}
						draggable={true}
						on:click={() => w.isDummy && addWorkspace(false)}
						on:dragstart={(event) => {
							$draggedWorkspace = w;
							event.dataTransfer && (event.dataTransfer.effectAllowed = 'all');
							//event.preventDefault();
						}}
					>
						<!-- on:dragend={()=>{$draggedWorkspace=null}} -->
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
			grid-template-rows: repeat(2, 1fr);
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
