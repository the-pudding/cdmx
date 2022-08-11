<script>
	import { language } from "$stores/misc.js";
	import { fade } from "svelte/transition";

	export let id;
	export let content;
	export let modal;

	$: console.log({ id, content });
</script>

<section {id} class:modal transition:fade>
	{#each content as p}
		{@const text = p[$language]}
		<p>{@html text}</p>
	{/each}
</section>

<style>
	section {
		max-width: 700px;
		margin: 5em auto;
	}
	.modal {
		position: absolute;
		top: 0;
		background: lightblue;
		padding: 0.5em 1.5em;
	}
</style>
