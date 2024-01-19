<script lang="ts">
	import type { Workspace } from "./model";
	import browser from "webextension-polyfill";
	document.addEventListener('DOMContentLoaded', updateTabs);
	let tabs: browser.Tabs.Tab[] = [];
	let workspaces: Workspace[] = [];
	let selectedWorksapce: Workspace | null = null;
	let editMode = false;
	function updateTabs() {
		browser.tabs.query({}).then((x) => (tabs = x));
	}

	async function changeActiveTab(id: number | undefined) {
		await browser.tabs.update(id!, { active: true });
		updateTabs();
	}
	let nameValue = '';
	function updateSelectedWorkspaceData(name:string) {
		if(!selectedWorksapce) {
			return;
		}
		selectedWorksapce.name = name;
		selectedWorksapce = selectedWorksapce;
		workspaces = workspaces;
	}
	function createNewWorkspace(name:string) {
		selectedWorksapce = {name: name};
		workspaces.push(selectedWorksapce);
		workspaces = workspaces;
	}
</script>

<main>
	<section class="workspaces">
		<div class="list">
			{#each workspaces as w}
				<span>{w.name}</span>
			{/each}
			<button on:click={() => createNewWorkspace('a')}>Create workspace</button>
		</div>
		{#if editMode && selectedWorksapce}
			 <div class="edit">
				<input type="text" bind:value={nameValue} on:change={()=>updateSelectedWorkspaceData(nameValue)}>
			 </div>
		{/if}
	</section>
	<section class="current">
		<li>
			{#each tabs as t}
				{#if t.id !== undefined && !t.hidden}
					<ul>
						<button on:click={async () => await changeActiveTab(t.id)}>{t.url}</button>
					</ul>
				{/if}
			{/each}
		</li>
	</section>
</main>

<style lang="scss">
	section {
		width: 255px;
	}
</style>
