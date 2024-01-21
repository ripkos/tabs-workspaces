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

<li class:active={isActive} class="workspace flex-item flex column nowrap">
	<h1 class="head">{w.name}</h1>
	<ul class="tabs flex-item flex column oy nowrap">
		{#each w.tabs as t}
			<li class="tab flex-item no-shrink">
				<button class="flex center left space-between">
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
					<span class="flex-item">{t.title}</span>
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
		.head {
			text-align: center;
			height: 32px;
			width: 100%;
		}
		.tabs {
			gap: 4px;
			.tab {
				padding: 4px;
				button {
					min-height: 32px;
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
