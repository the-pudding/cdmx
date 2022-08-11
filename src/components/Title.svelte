<script>
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";

	const { hed, dek, bylines } = copy;
</script>

<section id="title">
	<h1>{@html hed[$language]}</h1>
	<h2>{@html dek[$language]}</h2>

	{#each bylines as byline}
		<div>{@html byline[$language]}</div>
	{/each}
</section>

<style>
	section {
		background-image: url(assets/img/city.jpg);
		height: 100vh;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;

		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}

	h1,
	h2,
	div {
		background: white;
	}
</style>
