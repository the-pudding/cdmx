<script>
	import Sound from "$components/Sound.svelte";
	import copy from "$data/copy.json";
	import { freePlaySelection, buttonLocations } from "$stores/misc.js";
	import { fade } from "svelte/transition";

	let src;

	const ids = copy.soundBank.map((d) => d.id);

	$: src = $freePlaySelection
		? `assets/sound/${$freePlaySelection}.mp3`
		: undefined;

	const onClick = (e) => {
		const clickedId = e.target.id.replace("-button", "");
		$freePlaySelection = clickedId;
	};
</script>

{#each ids as id}
	{#if $buttonLocations[id]}
		<button
			id={`${id}-button`}
			on:click|stopPropagation={onClick}
			style:left={`${$buttonLocations[id][0]}%`}
			style:top={`${$buttonLocations[id][1]}%`}
			class:selected={$freePlaySelection === id}
			transition:fade
		/>
	{/if}
{/each}

{#if src}
	{#key src}
		<Sound {src} />
	{/key}
{/if}

<style>
	button {
		position: absolute;
		background: transparent;
		box-shadow: inset 0px 0px 25px 0px rgb(255, 215, 0, 0.5),
			0px 0px 70px 0px rgb(255, 215, 0, 1);
		border: none;
		height: 100px;
		width: 100px;
		border-radius: 50px;
	}
	.selected,
	button:hover {
		box-shadow: inset 0px 0px 25px 0px rgba(72, 189, 240, 0.5),
			0px 0px 70px 0px rgb(72, 189, 240, 1);
	}
</style>
