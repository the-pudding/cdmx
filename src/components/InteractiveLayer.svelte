<script>
	import Sound from "$components/Sound.svelte";
	import copy from "$data/copy.json";
	import {
		freePlaySelection,
		freePlayHover,
		flyLocations,
		inModal
	} from "$stores/misc.js";
	import { fade } from "svelte/transition";

	const ids = copy.soundBank.map((d) => d.id);

	$: src = $freePlaySelection
		? `assets/sound/${$freePlaySelection}.mp3`
		: undefined;

	const onClick = (e) => {
		const clickedId = e.target.id.replace("-button", "");
		$freePlaySelection = clickedId;
	};
	const onButtonHover = (e) => {
		if (!$freePlaySelection)
			$freePlayHover = e.target.id.replace("-button", "");
	};
	const onButtonLeave = () => {
		$freePlayHover = undefined;
	};
</script>

{#each ids as id}
	{#if $flyLocations[id]}
		<img
			class="vendor"
			class:visible={id === $freePlaySelection || id === $freePlayHover}
			src={`assets/img/freeplay/${id}.png`}
		/>

		<button
			id={`${id}-button`}
			on:click|stopPropagation={onClick}
			on:mouseenter={onButtonHover}
			on:mouseleave={onButtonLeave}
			style:left={`${$flyLocations[id][0] * 100}%`}
			style:top={`${$flyLocations[id][1] * 100}%`}
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
		transform: translate(-50%, -50%);
		border: none;
		height: 100px;
		width: 100px;
		border-radius: 50px;
		z-index: 11;
	}

	.selected,
	button:hover {
		/* box-shadow: inset 0px 0px 25px 0px rgba(72, 189, 240, 0.5),
			0px 0px 70px 0px rgb(72, 189, 240, 1); */
	}

	.description {
		position: absolute;
		border: 2px solid black;
		top: 37%;
		left: 51%;
	}

	.vendor {
		position: absolute;
		top: 0;
		width: 100%;
		min-width: 1378px;
		opacity: 0;
		z-index: -1;
		transition: opacity 500ms;
	}
	img.visible {
		opacity: 1;
		z-index: 10;
	}
</style>
