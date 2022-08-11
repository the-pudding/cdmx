<script>
	import { language, inModal, inFreePlay } from "$stores/misc.js";
	import { fade } from "svelte/transition";

	export let id;
	export let content;
	export let title;
	export let modal;

	const startFreePlay = () => {
		$inModal = false;
		$inFreePlay = true;
	};
</script>

<section {id} class:modal transition:fade>
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
