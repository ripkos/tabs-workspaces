<script lang="ts">
	import { getDefaultWorkspace } from '../lib/browser-tools';
	import { type Workspace, WorkspaceOnInactive, MsgRequestType } from '../lib/model';
	import { sendMessageRequest } from './shared';
	import { draggedWorkspace, workspaces } from './store';
	import ColorPicker from 'svelte-awesome-color-picker';
	let selectedWorkspace: Workspace | null = null;
	const options = [
		WorkspaceOnInactive.HIDE,
		WorkspaceOnInactive.SUSPSEND,
		WorkspaceOnInactive.CLOSE,
	];
	const colors = [
		'#5F6368',
		'#4285F4',
		'#EA4335',
		'#FBBC05',
		'#34A853',
		'#F28B82',
		'#A142F4',
		'#1DA1F2',
	];
	let drag = false;
	function clearWorkspace() {
		selectedWorkspace = null;
	}
	async function updateSelectedWorkspace() {
		if (!selectedWorkspace) return;
		await sendMessageRequest({
			type: MsgRequestType.UPDATE_SINGLE_WORKSPACE,
			singleWorkspace: selectedWorkspace,
			windowId: browser.windows.WINDOW_ID_CURRENT,
		});
	}

	async function replaceDeletedWithDummy() {
		if (!selectedWorkspace) return;
		await sendMessageRequest({
			type: MsgRequestType.MARK_DELETED_AS_DUMMY,
			singleWorkspace: selectedWorkspace,
			windowId: browser.windows.WINDOW_ID_CURRENT,
		});
		selectedWorkspace = null;
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
		<div class="color-options">
			{#each colors as c}
				<button
					class="color-option"
					on:click={async () => {
						if (selectedWorkspace !== null) {
							selectedWorkspace.colorPrimary = c;
							await updateSelectedWorkspace();
						}
					}}
					style="background-color: {c}; color: {c}">+</button
				>
			{/each}
		</div>
		<div class="color-picker-wrapper">
			<ColorPicker
				isDialog={false}
				on:input={updateSelectedWorkspace}
				bind:hex={selectedWorkspace.colorPrimary}
				--picker-width="160px"
				--picker-height="160px"
				textInputModes={['hex']}
			/>
		</div>
		<button
			on:click={replaceDeletedWithDummy}
			disabled={$workspaces.some((x) => x.id === selectedWorkspace?.id && x.isActive)}
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
		.color-options {
			.color-option {
				width: $x5;
				height: $x5;
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
	.color-picker-wrapper {
		align-self: center;
	}
	:global(.color-picker-wrapper .color-picker .wrapper) {
		padding: 0;
		background: none;
		margin: 0;
		border: unset;
		width: unset;
	}
	:global(
			.color-picker-wrapper
				.color-picker
				.wrapper
				.input-container
				input[aria-label='alpha channel']
		) {
		display: none;
	}
</style>
