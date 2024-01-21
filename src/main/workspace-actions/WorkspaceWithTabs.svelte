<script lang="ts">
	import type { Workspace } from '../../lib/model';
	export let w: Workspace;
	export let isActive: boolean = false;
	async function changeHighLigh(id: number | undefined, value: boolean) {
		if (id !== undefined && !isNaN(id)) {
			await browser.tabs.update(id, { highlighted: value });
		}
	}
</script>

<li class:active={isActive} class="workspace">
	<h1 class="head">{w.name}</h1>
	<ul class="tabs">
		{#each w.tabs as t}
			<li class="tab">
				<button>
					{#if isActive}				
						{#if t.active}
							<span role="document" class="preview disabled">X</span>
						{:else}
							<span
								role="document"
								class="preview"
								on:mouseenter={async () => await changeHighLigh(t.id, true)}
								on:mouseleave={async () => await changeHighLigh(t.id, false)}>X</span
							>
						{/if}
					{/if}
					<span>{t.title}</span>
					<span>o</span>
				</button>
			</li>
		{/each}
	</ul>
</li>

<style lang="scss">
	.workspace {
		border-radius: 8px;
		border-width: 2px;
		border-style: solid;
		display: grid;
		.head {
			text-align: center;
			height: 32px;
			width: 100%;
		}
		.tabs {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items:stretch;
			overflow-y: scroll;
			.tab {
				width: 100%;
				padding: 4px;
				button {
					text-align: left;
					min-height: 32px;
					display: flex;
					align-items: center;
					gap: 4px;
					width: 100%;
					border-radius: 8px;
					border-width: 2px;
					border-style: solid;
					background: unset;
					border-color: black;
				}
			}
		}
	}
</style>

