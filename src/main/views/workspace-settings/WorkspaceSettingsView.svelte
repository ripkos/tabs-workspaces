<script lang="ts">
	import { type Workspace, WorkspaceOnInactive } from '../../../lib/model';
	import { draggedWorkspace } from '../../store';
	let selectedWorkspace: Workspace | null = null;
	const options = [
		WorkspaceOnInactive.HIDE,
		WorkspaceOnInactive.SUSPSEND,
		WorkspaceOnInactive.CLOSE,
	];
	const colors = [1, 2, 3, 4, 5, 7, 8];
	let drag = false;
	function clearWorkspace() {
		selectedWorkspace=null;
	}
</script>

<section>
	{#if selectedWorkspace === null}
		<div
			role="contentinfo"
			on:dragenter={(event) => {
				event.preventDefault();
				drag = true;
				event.dataTransfer && (event.dataTransfer.dropEffect='copy');

			}}
			on:dragleave={(event) => {
				event.preventDefault();
				drag = false;
			}}
			on:dragover={(event)=>{event.preventDefault()}}
			on:drop={(event) => {
				selectedWorkspace = $draggedWorkspace;
				$draggedWorkspace = null;
				drag = false;
			}}
			class:drag
			class="empty"
		>
			Drop workspace here to edit
		</div>
	{:else}
		<button class="clear" on:click={clearWorkspace}>X</button>
		<div class="preview">
			<button>
				<span>{selectedWorkspace.name}</span>
			</button>
		</div>
		<div>
			{#each options as value}
				<label>
					<input type="radio" bind:group={selectedWorkspace.onInactive} {value} />
					{value}
				</label>
			{/each}
		</div>
		<div class="color-picker">
			{#each colors as c}
				<span>{c}</span>
			{/each}
		</div>
		<button>Delete</button>
	{/if}
</section>

<style lang="scss">
	@import '../../../lib/vars';
	.preview {
		width: $x8;
		height: $x8;
		padding: 0;
		margin: 0;
		font-size: $x5;
		button {
			border: $x2 black solid;
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
	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		padding: $x4;
		border-right: $x2 solid black;
		width: $x85;
		height: 100%;
		align-items: center;
		.empty {
			padding: $x4;
			border: $x2 dotted gray;
			display: grid;
			align-items: center;
			height: 100%;
			text-align: center;
			text-wrap: wrap;
			&.drag {
				border-color: yellow;
			}
		}
		.clear {
			width: $x6;
			height: $x6;
			background-color: #f74b4b;
			border-radius: 50%;
			font-size: $x5;
			align-self: end;
		}
	}
</style>
