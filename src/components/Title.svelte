<script>
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";

	const { hed, dek, bylines } = copy;
</script>

<section id="title">
	<h1>{hed[$language]}</h1>
	<h2>{dek[$language]}</h2>

	{#each bylines as byline}
		<div>{@html byline[$language]}</div>
	{/each}
</section>

<style>
	section {
		text-align: center;
	}
</style>
