<script lang="ts">
	import type { Workspace } from '../../../lib/model';

	export let w: Workspace | null = null;
	export let isActive: boolean = false;
	async function changeHighLigh(id: number | undefined, value: boolean) {
		if (id !== undefined && !isNaN(id)) {
			await browser.tabs.update(id, { highlighted: value });
		}
	}
</script>

{#if w !== null}
	<div class="workspace flex column nowrap">
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
	</div>
{:else}
	<div class="dummy">+</div>
{/if}

<style lang="scss">
	@import '../../../lib/vars';
	.workspace {
		border-radius: $x4;
		border-width: $x2;
		border-style: solid;
		.head {
			text-align: center;
			height: 32px;
			width: 100%;
		}
		.tabs {
			gap: $x3;
			.tab {
				padding: $x3;
				button {
					min-height: $x6;
					gap: $x3;
					width: 100%;
					border-radius: $x4;
					border-width: $x2;
					border-style: solid;
					background: unset;
					border-color: black;
				}
			}
		}
	}
</style>
