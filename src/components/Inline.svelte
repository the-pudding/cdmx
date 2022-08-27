<script>
	import {
		language,
		inModal,
		inFreePlay,
		ambi,
		ambiVolume
	} from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import inView from "$actions/inView.js";

	export let id;
	export let content;
	export let title;
	export let modal;

	const startFreePlay = () => {
		$inModal = false;
		$inFreePlay = true;

		const el = document.getElementById("scroll-to-explore");
		el.scrollIntoView({ block: "center" });
	};

	const adjustAmbi = () => {
		if (id === "inline1") {
			$ambi = 1;
			$ambiVolume = 0.2;
		}
	};
</script>

<section
	{id}
	class:modal
	transition:fade
	use:inView={{ bottom: 200 }}
	on:enter={adjustAmbi}
>
	<h2>{@html title}</h2>
	{#each content as p}
		{@const text = p[$language]}
		<p>{@html text}</p>
	{/each}

	{#if id === "free"}
		<button on:click={startFreePlay}>explore!</button>
	{/if}
</section>

<style>
	section {
		max-width: 700px;
		margin: 5em auto;
		padding: 0 1em;
	}
	.modal {
		position: absolute;
		top: 0;
		background: var(--color-gray-200);
		padding: 1.5em;
		box-shadow: 0 3px 7px rgb(0 0 0 / 30%);
		z-index: 3000;
	}
	.modal h2 {
		margin: 0;
	}
</style>
