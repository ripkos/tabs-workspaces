<script lang="ts">
	import { MsgRequestType, type Workspace } from '../lib/model';
	import { sendMessageRequest } from './shared';
	import { workspaces, draggedWorkspace } from './store';
	let draggedIndex = -1;
	let hoverOverIndex = -1;
	//$: len = $workspaces.length > 4 ? ($workspaces.length > 9 ? 4 : 3) : 2;

	async function replaceDummyWithWorkspace(w: Workspace) {
		const clone = { ...w };
		clone.isDummy = false;
		clone.name = 'Workspace';
		await sendMessageRequest({
			type: MsgRequestType.UPDATE_SINGLE_WORKSPACE,
			singleWorkspace: clone,
			windowId: browser.windows.WINDOW_ID_CURRENT,
		});
	}

	async function setActiveWorkspace(w: Workspace) {
		const clone = { ...w };
		clone.isActive = true;
		await sendMessageRequest({
			type: MsgRequestType.UPDATE_SINGLE_WORKSPACE,
			singleWorkspace: clone,
			windowId: browser.windows.WINDOW_ID_CURRENT,
		});
	}

	async function swapWorkspaces(i1: number, i2: number) {
		let ws = $workspaces;
		[ws[i1], ws[i2]] = [ws[i2], ws[i1]];
		await sendMessageRequest({
			type: MsgRequestType.UPDATE_WORKSPACES,
			workspaces: ws,
			windowId: browser.windows.WINDOW_ID_CURRENT,
		});
	}

	let drag = false;
</script>

<section>
	<ul>
		{#each $workspaces as w, i}
			<li class:drag={drag && i !== draggedIndex && i === hoverOverIndex}>
				<button
					style="background-color: {w.colorPrimary};"
					class:dummy={w.isDummy}
					draggable={!w.isDummy}
					on:click={async () => {
						if (w.isDummy) {
							await replaceDummyWithWorkspace(w);
						} else {
							await setActiveWorkspace(w);
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
					on:drop={async (event) => {
						if (draggedIndex > -1) {
							await swapWorkspaces(draggedIndex, i);
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
