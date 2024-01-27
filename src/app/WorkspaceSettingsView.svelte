<script lang="ts">
	import { getDefaultWorkspace } from '../lib/browser-tools';
	import { type Workspace, WorkspaceOnInactive } from '../lib/model';
	import { clearEmptyRows } from './shared';
	import { draggedWorkspace, workspacesHolder } from './store';
	let selectedWorkspace: Workspace | null = null;
	const options = [
		WorkspaceOnInactive.HIDE,
		WorkspaceOnInactive.SUSPSEND,
		WorkspaceOnInactive.CLOSE,
	];
	const colors = [1, 2, 3, 4, 5, 7, 8];
	let drag = false;
	function clearWorkspace() {
		selectedWorkspace = null;
	}
	function updateSelectedWorkspace() {
		if (!selectedWorkspace) return;
		const curr = selectedWorkspace as Workspace;
		workspacesHolder.update((x) => {
			let w: Workspace = x.workspaces.find((w) => w.id === curr.id)!;
			w = { ...curr };
			return x;
		});
	}
	function replaceDeletedWithDummy() {
		if (!selectedWorkspace) return;
		workspacesHolder.update((x) => {
			const index = x.workspaces.findIndex((w) => w.id === selectedWorkspace?.id);
			if (index > -1) {
				const newID = Math.max(...x.workspaces.map((w) => w.id)) + 1;
				x.workspaces[index] = getDefaultWorkspace(newID, true);
			}
			return x;
		});
		selectedWorkspace = null;
		clearEmptyRows(workspacesHolder);
	}
</script>

<section>
	{#if selectedWorkspace === null || $draggedWorkspace !== null}
		<div
			role="contentinfo"
			on:dragenter={(event) => {
				event.preventDefault();
				drag = true;
				event.dataTransfer && (event.dataTransfer.dropEffect = 'copy');
			}}
			on:dragleave={(event) => {
				event.preventDefault();
				drag = false;
			}}
			on:dragover={(event) => {
				event.preventDefault();
			}}
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
		<button class="btn-clear" on:click={clearWorkspace}>X</button>
		<div class="preview">
			<button disabled>
				<span>{selectedWorkspace.name}</span>
			</button>
		</div>
		<div>
			<label>
				Name:
				<input
					type="text"
					on:change={updateSelectedWorkspace}
					bind:value={selectedWorkspace.name}
				/>
			</label>
		</div>
		<div>
			{#each options as value}
				<label>
					<input
						type="radio"
						on:change={updateSelectedWorkspace}
						bind:group={selectedWorkspace.onInactive}
						{value}
					/>
					{value}
				</label>
			{/each}
		</div>
		<div class="color-picker">
			{#each colors as c}
				<span>{c}</span>
			{/each}
		</div>
		<button
			on:click={replaceDeletedWithDummy}
			disabled={$workspacesHolder.activeWorkspaceID === selectedWorkspace.id}
			class="btn-delete">Delete</button
		>
	{/if}
</section>

<style lang="scss">
	@import '../lib/vars';
	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		padding: $x4;
		border-right: $x2 solid black;
		width: $x85;
		height: 100%;
		align-items: stretch;
		gap: $x5;
		// Empty mode
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
		// Edit mode
		.preview {
			width: $x8;
			height: $x8;
			padding: 0;
			margin: 0;
			font-size: $x5;
			align-self: center;
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
		.btn-clear {
			width: $x6;
			height: $x6;
			background-color: #f74b4b;
			border-radius: 50%;
			font-size: $x5;
			align-self: end;
		}
		.btn-delete {
			background-color: #f74b4b;
			justify-self: flex-end;
		}
	}
</style>
